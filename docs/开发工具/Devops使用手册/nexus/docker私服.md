# 一.容器整理
http://www.eryajf.net/1816.html
https://blog.csdn.net/u010398771/article/details/102665798
https://juejin.im/post/5c70a8156fb9a049f746d0fc

[root@host-172-18-233-123 docker]# vi daemon.json 
{
        "graph":"/Intelligent/docker/dockerdata",
        "insecure-registries":["172.18.234.180:8082"],
        "bip":"192.168.0.1/24"
}
systemctl daemon-reload
systemctl restart docker



## 1.1.nexus3 私服容器化安装

### docker下安装nexus3：

#### 拉取镜像
`docker pull sonatype/nexus3`

#### 创建volume卷
`docker volume create --name nexus-data`

#### 启动容器
```
docker run -d --name nexus3 \
 --restart=always \
-p 8081:8081 \
-p 8082:8082  \
-p 8083:8083  \
-p 8084:8084  \
-p 8085:8085   \
-v nexus-data:/nexus-data \
sonatype/nexus3
```

**映射端口对应的用途**

* 8081：nexus3网页端
* 8082：docker(hosted)私有仓库，可以pull和push
* 8083：docker(proxy)代理远程仓库，只能pull
* 8084：docker(group)私有仓库和代理的组，只能pull



**简单配置**

我们可以在 /opt/nexus/bin 下面看到一个 nexus.vmoptions 的配置文件，通过这个配置文件可以直接 jvm 参数。
```
$ cat nexus.vmoptions
-Xms1200M
-Xmx1200M
-XX:MaxDirectMemorySize=2G
-XX:+UnlockDiagnosticVMOptions
-XX:+UnsyncloadClass
-XX:+LogVMOutput
-XX:LogFile=../sonatype-work/nexus3/log/jvm.log
-XX:-OmitStackTraceInFastThrow
-Djava.net.preferIPv4Stack=true
-Dkaraf.home=.
-Dkaraf.base=.
-Dkaraf.etc=etc/karaf
-Djava.util.logging.config.file=etc/karaf/java.util.logging.properties
-Dkaraf.data=../sonatype-work/nexus3
-Djava.io.tmpdir=../sonatype-work/nexus3/tmp
-Dkaraf.startLocalConsole=false
```
复制代码这里的相对路径是相对于 nexus 本身，而非 nexus/bin。我们可以看到它会自动在 nexus 目录的父目录下生成 sonatype-work 目录，用来放配置文件、数据，还有日志等，你可以通过修改配置文件来改变它的位置。
前面使用 root 用户启动之后生成的这个目录的权限是 root，再使用普通用户启动的话，普通用户会因为没有权限往里面的日志文件中写数据而导致启动失败，所以只是上面要修改这个目录权限的原因。


#### 访问网页端
http://127.0.0.1:8081  默认账号密码: admin/admin123

## 仓库配置

### 私有仓库配置：

**Repository >>Repositories>>Create repository 选择 docker(hosted)**

![配置docker_hosted](media/images/nexus_hosted.png)

**配置Realms:Security >> Realms，把 Docker Realm 激活 **
![配置docker_hosted](media/images/nexus_hosted_realms.png)

#### 连接仓库：
连接仓库前需要进行配置 vim /etc/docker/daemon.json
```
{
  "insecure-registries": ["172.16.77.71:8082" ]
}
    
systemctl daemon-reload
systemctl restart docker
```
**登录仓库：**

注意这里的端口是配置仓库时选择的端口号

`docker login -u admin -p admin123 172.16.77.71:8082 `

**上传镜像：**
```
docker tag nginx:latest 172.16.77.71:8082/nginx:0.1
docker push 172.16.77.71:8082/nginx:0.1
```

**拉取镜像：**
`docker pull 172.16.77.71:8082/nginx:0.1`

**搜索镜像：**
`docker search 172.16.77.71:8082/nginx`

### proxy镜像仓库配置：
https://help.sonatype.com/repomanager3/formats/docker-registry/proxy-repository-for-docker
![配置docker_hosted](media/images/nexus_hosted.png)

### public镜像仓库配置：
![配置docker_public](media/images/nexus_public.png)

输入http://192.168.101.64:8889
初次运行Jenkins会经过一个安装过程，一般情况使用默认配置，下一步安装即可，其中一步需要输入密码，如下
# 二.使用配置

# 三.插件使用

## 3.1 Maven Integration plugin


# 常见问题

## jenkins构建从svn取代码出现延迟原因及解决方法
* 现象：开发人员上传代码后，使用jenkins立即构建，出现无法获取到开发人员刚上传的最新版本代码；
* 原因：Jenkins服务器时间与SVN服务器时间不一致，Jenkins的SVN插件是使用时间标签下载，而不是取HEAD， 因此如果svn服务器的提交代码时间比Jenkins的当前时间晚，该代码就不会被更新；
* 后果：若通过jenkins构建取代码上线，很容易出现由于jenkins服务器与svn时间不一致，而导致上线代码版本取的不是最新版，直接影响上线结果，若上线后未充分测试，很可能是重大故障的隐患；构建代码上传测试环境，也会出现构建时取不到最新版本代码，而影响测试结果和效率；
* 解决方法：在jenkins中svn链接中增加@HEAD，可以不用理会jenkins服务器时间，直接更新到最新的版本；
![无法获取最新版本svn代码](./images/cannnotfindsvncode.png)



3-1. 国内加速站点
https://registry.docker-cn.com

http://hub-mirror.c.163.com

https://3laho3y3.mirror.aliyuncs.com

http://f1361db2.m.daocloud.io

https://mirror.ccs.tencentyun.com


```
mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```


**CA证书生成**
```
openssl req -x509 -nodes -days 36500 -newkey rsa:2048 -keyout nginx.key -out nginx.crt -subj "/C=CN/ST=ShenZhen/L=ShenZhen/O=Example Inc./OU=Web Security/CN=registry.ntpstat.com"
```
https://www.jb51.net/article/91187.htm
https://blog.csdn.net/smartdt/article/details/80027579
https://aotu.io/notes/2016/08/16/nginx-https/index.html
https://juejin.im/post/5c70a8156fb9a049f746d0fc
https://blog.csdn.net/dayi_123/article/details/79753018
https://blog.csdn.net/shida_csdn/article/details/80006645
https://juejin.im/post/5c70a8156fb9a049f746d0fc
**nginx.conf**
```
user  root;
worker_processes  1;

error_log  logs/error.log;
pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on;

    server {
      listen       9080;
      server_name  172.16.137.104;
		
      location / {
        root   html;
        index  index.html index.htm;
      }
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
        root   html;
      }
    }

    server {
      listen       443 ssl;
      server_name  172.16.137.104;

	  # 允许大文件上传
	  client_max_body_size 1G;

	  # 对大于 1G 文件的下载进行优化
	  #proxy_max_temp_file_size 2G;

      ssl_certificate /root/tengine/nginx/ssl/nginx.crt;
      ssl_certificate_key /root/tengine/nginx/ssl/nginx.key;
      ssl_session_cache    shared:SSL:1m;
      ssl_session_timeout  5m;
      #禁止在header中出现服务器版本，防止黑客利用版本漏洞攻击
      #server_tokens off;
      #如果是全站 HTTPS 并且不考虑 HTTP 的话，可以加入 HSTS 告诉你的浏览器本网站全站加密，并且强制用 HTTPS 访问
      #fastcgi_param   HTTPS               on;
      #fastcgi_param   HTTP_SCHEME         https;

      location / {
        proxy_pass http://127.0.0.1:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto "https";
	  }
    }
}

```

```
forbidden (13: Permission denied)
解决：
user nobody; -->  user  root;

```

```
从容停止Nginx：
kill -QUIT 主进程号  
例如：kill -QUIT 16391

快速停止Nginx：
kill -TERM 主进程号  

强制停止Nginx：
kill -9 主进程号 
```
**CentOS7 Docker x509: certificate signed by unknown authority 解决方案**
```
本机拉本机仓库，那直接把crt证书拉本地，放

/etc/pki/ca-trust/source/anchors/
然后执行

update-ca-trust
然后重启docker，即可。

外部Client的话（docker配置文件根据系统会有不同，自己定位）：

vim /etc/docker/daemon.json
添加

{ "insecure-registries":["IP:端口"] }
/etc/init.d/docker restart
```

docker run -itd --name=nexus-nginx -p 9090:80 -v /root/nginx:/var/nginx nginx


```
{
	"graph":"/Intelligent/dockerdata",
	"registry-mirrors":["https://registry.docker-cn.com"],
	"bip":"192.168.0.1/24",
	"insecure-registries":["172.21.4.101:5000"]
}
```
