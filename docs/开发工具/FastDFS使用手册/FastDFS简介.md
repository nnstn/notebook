# FastDFS简介

## 1.1.什么是分布式文件系统

分布式文件系统（Distributed File System）是指文件系统管理的物理存储资源不一定直接连接在本地节点上，而是通过计算机网络与节点相连。 

通俗来讲：

- 传统文件系统管理的文件就存储在本机。
- 分布式文件系统管理的文件存储在很多机器，这些机器通过网络连接，要被统一管理。无论是上传或者访问文件，都需要通过管理中心来访问

## 1.2.什么是FastDFS

FastDFS是由淘宝的余庆先生所开发的一个轻量级、高性能的开源分布式文件系统。用纯C语言开发，功能丰富：

- 文件存储
- 文件同步
- 文件访问（上传、下载）
- 存取负载均衡
- 在线扩容

适合有大容量存储需求的应用或系统。同类的分布式文件系统有谷歌的GFS、HDFS（Hadoop）、TFS（淘宝）等。

## 1.3.FastDFS的架构

### 1.3.1.架构图

先上图：

 ![1526205318630](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526205318630.png)

FastDFS两个主要的角色：Tracker Server 和 Storage Server 。

- Tracker Server：跟踪服务器，主要负责调度storage节点与client通信，在访问上起负载均衡的作用，和记录storage节点的运行状态，是连接client和storage节点的枢纽。 
- Storage Server：存储服务器，保存文件和文件的meta data（元数据），每个storage server会启动一个单独的线程主动向Tracker cluster中每个tracker server报告其状态信息，包括磁盘使用情况，文件同步情况及文件上传下载次数统计等信息
- Group：文件组，多台Storage Server的集群。上传一个文件到同组内的一台机器上后，FastDFS会将该文件即时同步到同组内的其它所有机器上，起到备份的作用。不同组的服务器，保存的数据不同，而且相互独立，不进行通信。 
- Tracker Cluster：跟踪服务器的集群，有一组Tracker Server（跟踪服务器）组成。
- Storage Cluster ：存储集群，有多个Group组成。

### 1.3.2.上传和下载流程

> 上传

 ![1526205664373](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526205664373.png)

1. Client通过Tracker server查找可用的Storage server。
2. Tracker server向Client返回一台可用的Storage server的IP地址和端口号。
3. Client直接通过Tracker server返回的IP地址和端口与其中一台Storage server建立连接并进行文件上传。
4. 上传完成，Storage server返回Client一个文件ID，文件上传结束。

> 下载

 ![1526205705687](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526205705687.png)

1. Client通过Tracker server查找要下载文件所在的的Storage server。
2. Tracker server向Client返回包含指定文件的某个Storage server的IP地址和端口号。
3. Client直接通过Tracker server返回的IP地址和端口与其中一台Storage server建立连接并指定要下载文件。
4. 下载文件成功。



## 3.4.安装和使用

参考课前资料的：《centos安装FastDFS.md》

 ![1526205975025](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526205975025.png)



## 3.5.java客户端

余庆先生提供了一个Java客户端，但是作为一个C程序员，写的java代码可想而知。而且已经很久不维护了。

这里推荐一个开源的FastDFS客户端，支持最新的SpringBoot2.0。

配置使用极为简单，支持连接池，支持自动生成缩略图，狂拽酷炫吊炸天啊，有木有。

地址：[tobato/FastDFS_client](https://github.com/tobato/FastDFS_Client)

 ![1526206304954](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526206304954.png)

### 3.5.1.引入依赖

在父工程中，我们已经管理了依赖，版本为：

```xml
<fastDFS.client.version>1.26.2</fastDFS.client.version>
```

因此，这里我们直接引入坐标即可：

```xml
<dependency>
    <groupId>com.github.tobato</groupId>
    <artifactId>fastdfs-client</artifactId>
</dependency>
```



### 3.5.2.引入配置类

纯java配置：

```java
@Configuration
@Import(FdfsClientConfig.class)
// 解决jmx重复注册bean的问题
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
public class FastClientImporter {
}
```

### 3.5.3.编写FastDFS属性

```yaml
fdfs:
  so-timeout: 1501
  connect-timeout: 601
  thumb-image: # 缩略图
    width: 60
    height: 60
  tracker-list: # tracker地址
    - 192.168.56.101:22122
```

### 3.5.4.测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LyUploadService.class)
public class FdfsTest {

    @Autowired
    private FastFileStorageClient storageClient;

    @Autowired
    private ThumbImageConfig thumbImageConfig;

    @Test
    public void testUpload() throws FileNotFoundException {
        File file = new File("D:\\test\\baby.png");
        // 上传并且生成缩略图
        StorePath storePath = this.storageClient.uploadFile(
                new FileInputStream(file), file.length(), "png", null);
        // 带分组的路径
        System.out.println(storePath.getFullPath());
        // 不带分组的路径
        System.out.println(storePath.getPath());
    }

    @Test
    public void testUploadAndCreateThumb() throws FileNotFoundException {
        File file = new File("D:\\test\\baby.png");
        // 上传并且生成缩略图
        StorePath storePath = this.storageClient.uploadImageAndCrtThumbImage(
                new FileInputStream(file), file.length(), "png", null);
        // 带分组的路径
        System.out.println(storePath.getFullPath());
        // 不带分组的路径
        System.out.println(storePath.getPath());
        // 获取缩略图路径
        String path = thumbImageConfig.getThumbImagePath(storePath.getPath());
        System.out.println(path);
    }
}
```

结果：

```
group1/M00/00/00/wKg4ZVro5eCAZEMVABfYcN8vzII630.png
M00/00/00/wKg4ZVro5eCAZEMVABfYcN8vzII630.png
M00/00/00/wKg4ZVro5eCAZEMVABfYcN8vzII630_60x60.png
```

访问第一个路径：

![1526215187172](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526215187172.png)

访问最后一个路径（缩略图路径），注意加组名：

 ![1526215257110](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526215257110.png)



### 3.5.5.改造上传逻辑

```java
@Service
public class UploadService {

    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    // 支持的文件类型
    private static final List<String> suffixes = Arrays.asList("image/png", "image/jpeg");

    @Autowired
    FastFileStorageClient storageClient;

    public String upload(MultipartFile file) {
        try {
            // 1、图片信息校验
            // 1)校验文件类型
            String type = file.getContentType();
            if (!suffixes.contains(type)) {
                logger.info("上传失败，文件类型不匹配：{}", type);
                return null;
            }
            // 2)校验图片内容
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                logger.info("上传失败，文件内容不符合要求");
                return null;
            }

            // 2、将图片上传到FastDFS
            // 2.1、获取文件后缀名
            String extension = StringUtils.substringAfterLast(file.getOriginalFilename(), ".");
            // 2.2、上传
            StorePath storePath = this.storageClient.uploadFile(
                    file.getInputStream(), file.getSize(), extension, null);
            // 2.3、返回完整路径
            return "http://image.leyou.com/" + storePath.getFullPath();
        } catch (Exception e) {
            return null;
        }
    }
}
```



只需要把原来保存文件的逻辑去掉，然后上传到FastDFS即可。



### 3.5.6.测试

通过RestClient测试：

 ![1526215940805](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526215940805.png)

## 3.6.页面测试上传

发现上传成功：

 ![1526216133300](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526216133300.png)

不过，当我们访问页面时：

 ![1526216178123](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526216178123.png)

这是因为我们图片是上传到虚拟机的，ip为：192.168.56.101

因此，我们需要将image.leyou.com映射到192.168.56.101

修改我们的hosts：

 ![1526216272835](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526216272835.png)



再次上传：

 ![1526216322359](D:\gitlab\aicp-doc\docs\开发指南\FastDFS使用手册\assets\1526216322359.png)