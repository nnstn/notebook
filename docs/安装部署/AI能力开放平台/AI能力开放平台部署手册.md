# AI能力开放平台部署手册

## 0.基本信息

### 环境与组件说明

| 环境与组件    | 可能所需端口     |
| ------------- | ---------------- |
| Jdk1.8环境    |                  |
| mysql环境     | 3306             |
| zookeeper集群 | 2181，2888，3888 |
| kafka集群     | 9092             |



### Jar应用说明

| 应用名称       | 应用说明                                | 应用端口 |
| -------------- | --------------------------------------- | -------- |
| ciip-registry  | eureka服务注册中心                      | 9009     |
| adapter-sitech | ocr识别能力适配器服务                   | 9017     |
| aimobile       | kafka消息消费端，用户反馈信息接口的服务 | 9016     |
| ciip-platform  | 提供能力调用接口的服务                  | 9018     |

## 1.配置文件

### 1.1 Jar应用配置文件（application.yaml）

1.1.1 ciip-registry配置文件

```
applications/eureka/conf/application.yaml
```

```yaml
server:
  port: 9009

spring:
  application:
    name: ciip-registry
  security:
    user:
      name: admin
      password: admin

eureka:
  client:
    
    fetch-registry: false
    
    register-with-eureka: false
    
    service-url:
      defaultZone: http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka #将除去自身之外的所有eureka节点以逗号连接起来
  server:
    enable-self-preservation: false 
    eviction-interval-timer-in-ms: 5000 

```

1.1.1 adapter-sitech配置文件

```
applications/adapter-sitech/conf/application.yaml
```

```yaml

server:
  port: 9017
  servlet:
    context-path: /
spring:
  application:
    name: sitech
logging:
  level:
    com.sitech.aicp.provider.mapper: debug

eureka:
  client:
    service-url: 
      defaultZone: http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka #将除去自身之外的所有eureka节点以逗号连接起来
  instance:
    prefer-ip-address: true 
    
    instance-id: ${spring.application.name}:${server.port} 
    lease-renewal-interval-in-seconds: 5     
    lease-expiration-duration-in-seconds: 10 
kafka:
  cluster: 196.X.X.X:9092,196.X.X.X:9092,196.X.X.X:9092,196.X.X.X:9092 #将kafka的所有节点以逗号连接起来
  initIdleCapacity: 10
  maxIdle: 10
  topic: AiOCRAbility
```

1.1.1 aimobile配置文件

```
applications/aimobile/conf/application.yaml
```

```yaml
server:
  port: 9016
  servlet:
    context-path: /
spring:
  application:
    name: aimobile
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://196.X.X.X:3306/interactive?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false #将mysql地址替换成自己的mysql地址
    username: root #将用户名替换成自己的mysql用户名
    password: root #将密码替换成自己的mysql密码
eureka:
  client:
    service-url: 
      defaultZone: http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka #将除去自身之外的所有eureka节点以逗号连接起来
  instance:
    prefer-ip-address: true 
    
    instance-id: ${spring.application.name}:${server.port} 
    lease-renewal-interval-in-seconds: 5     
    lease-expiration-duration-in-seconds: 10 
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml
  type-aliases-package: com.siech.aipaas.po
  configLocation:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
druid:
  loginPassword: 123456
  loginUsername: admin
pagehelper:
  helper-dialect: mysql
logging:
  level:
    com.siech.aipaas.mapper: debug
swagger:
  show:
    true
knife4j:
  basic:
    enable: true
    username: admin
    password: admin

```

1.1.1 ciip-platform配置文件

```
applications/ciip-platform/conf/application.yaml
```

```yaml
server:
  port: 9018
  servlet:
    context-path: /
spring:
  application:
    name: platform
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://196.X.X.X:3306/interactive?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false #将mysql地址替换成自己的mysql地址
    username: root #将用户名替换成自己的mysql用户名
    password: root #将密码替换成自己的mysql密码
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml
  type-aliases-package: com.siech.aipaas.po
  configLocation:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

druid:
  loginPassword: 123456
  loginUsername: admin

pagehelper:
  helper-dialect: mysql

logging:
  level:
    com.siech.aipaas.mapper: debug
eureka:
  client:
    service-url: 
      defaultZone: http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka,http://admin:admin@196.X.X.X:9009/eureka #将除去自身之外的所有eureka节点以逗号连接起来
    fetch-registry: true 
    registry-fetch-interval-seconds: 5 
  instance:
    prefer-ip-address: true 
    
    instance-id: ${spring.application.name}:${server.port} 
    lease-renewal-interval-in-seconds: 5     
    lease-expiration-duration-in-seconds: 10 

cloudwalk:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule 
    ConnectTimeout: 60000        
    ReadTimeout: 60000            
    OkToRetryOnAllOperations: true
    MaxAutoRetries: 0           
    MaxAutoRetriesNextServer: 2   
    retryableStatusCodes: 503,500 

osmagic:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule 
    ConnectTimeout: 60000  
    ReadTimeout: 60000               
    OkToRetryOnAllOperations: true 
    MaxAutoRetries: 0              
    MaxAutoRetriesNextServer: 2    
    retryableStatusCodes: 503,500  

sitech:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule 
    ConnectTimeout: 60000           
    ReadTimeout: 60000               
    OkToRetryOnAllOperations: true 
    MaxAutoRetries: 0              
    MaxAutoRetriesNextServer: 2   
    retryableStatusCodes: 503,500  

recognition:
  image:
    dir: /home/aicp/data/person/

service:
  support: osmagic       
kafka:
  cluster: 196.X.X.X:9092,196.X.X.X:9092,196.X.X.X:9092,196.X.X.X:9092 #将kafka的所有节点以逗号连接起来
  initIdleCapacity: 10
  maxIdle: 10
  topic: Toperate_ciip_test

hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 60000

configParam:
  faceDbNew:
    total: 1000000  
  images:
    url: data/person/    
  recognition:
    url: http://127.0.0.1:10102/aipaasimage/
aipaas:
  service:
    support: sitech       
    url: /sitech/ocrAbility
```

### 1.2 Jar应用配置文件（application.yaml）

1.2.1 全局配置文件

```
config/conf.properties
```

```properties
picture.retention=true #是否留存图片图片
kafka.production=true #是否通过kafka消息队列进行能力调用记录入库步骤
kafka.url=http://127.0.0.1:9092 #kafka地址
```

## 2.项目启动

运行启动shell脚本

```shell
sh applications/eureka/bin/restartregistry.sh & sh applications/adapter-sitech/bin/restartsitech.sh & sh applications/aimobile/bin/restartaimobile.sh & sh applications/ciip-platform/bin/restartciip-platform.sh &
```

## 3.kafka安装

### 源码安装zookeeper

```bash
#解压
tar zxvf zookeeper-3.4.6.tar.gz
#设置配置文件
cd zookeeper-3.4.6/conf
cp zoo_sample.conf zoo.conf
vi zoo.conf
```

```bash
    tickTime=2000
    initLimit=10
    syncLimit=5
    dataDir=/usr/local/zookeeper/data # 改地址为 myid 文件所在目录
    clientPort=2181
   	server.1=196.x.x.x1:2888:3888 # server.1 中的1为myid中的对应的数字
    server.2=196.x.x.x2:2888:3888 # 2888 为通信端口
    server.3=196.x.x.x2:2888:3888 # 3888 为选举端口
```

### 启动zookeeper

```
zookeeper-3.4.6/zkServer.sh start
```

可以查看启动后的状态：

因为zookeeper的选举机制，部署集群节点数必须是3、5、7

一般以启动顺序第2个、第3个、第4个，会成为leader，其他的都是follow

```
zookeeper-3.4.6/zkServer.sh status
```

### 源码安装kafka

```bash
#解压
tar zxvf kafka_2.12-2.2.0.tgz
#设置配置文件、
vi kafka_2.12-2.2.0/config/server.properties
```

```bash
broker.id=0 #broker是编号，唯一的 
listeners=PLAINTEXT://127.0.0.1:9092 #kafka的监听地址与端口
num.network.threads=3
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600
log.dirs=/data/kafka/logs
num.partitions=3
num.recovery.threads.per.data.dir=1
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000
zookeeper.connect=192.x.x.x1:2181,192.x.x.x2:2181,192.x.x.x3:2181 #zookeeper的ip：端口,集群时以逗号连接
zookeeper.connection.timeout.ms=6000
group.initial.rebalance.delay.ms=0
auto.create.topics.enable=true
delete.topics.enable=true
```

### 启动kafka

```bash
kafka_2.12-2.2.0/bin/kafka-server-start.sh  -daemon kafka_2.12-2.2.0/config/server.properties 
```

### kafka使用验证

```bash
#创建一个topic
kafka_2.12-2.2.0/bin/kafka-topics.sh --create --zookeeper 192.x.x.x2:2181 --replication-factor 1 --partitions 1 --topic my-test

#查看topic列表
kafka_2.12-2.2.0/bin/kafka-topics.sh --list --zookeeper 192.x.x.x2:2181

#发送消息
kafka_2.12-2.2.0/bin/kafka-console-producer.sh --broker-list 192.x.x.x2:9092 --topic ocr

#接收消息
kafka_2.12-2.2.0/bin/kafka-console-consumer.sh --bootstrap-server 192.x.x.x2:9092 --topic ocr --from-beginning
```

### kafka创建应用所需的topic

```bash
#单机如：
kafka_2.12-2.2.0/bin/kafka-topics.sh --create --zookeeper 192.x.x.x2:2181 --replication-factor 1 --partitions 1 --topic AiOCRAbility
#集群如：
./kafka-topics.sh  —zookeeper 172.18.233.121:2181,172.18.233.122:2181,172.18.233.123:2181 —create —replication-factor 1  —partitions 3  —topic AiOcrAbility
```

### 4.mysql数据库导入

```bash
mysql -uroot -p
```

```mysql
mysql> create database interactive;      # 创建数据库
mysql> use interactive;                  # 使用已创建的数据库 
mysql> set names utf8;           				 # 设置编码
mysql> source /xxx/xxx/interactive.sql   # 导入备份数据库
```

