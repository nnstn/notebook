思特奇AI产品线

新员工入职后:需要具备的素质

1. 开发工具使用 
	IDE和eclipse使用
2. 代码管理工具git 和 [gitlab](http://172.18.234.180:9999/%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/GitLab%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C/GitLab%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.html)
3. Linux使用
4. docker使用
5. vue开发能力
6. java springboot springcloud
7. kafka
8. redis
9. mysql

------



持续集成环境:

gitlab地址:http://172.18.234.180/
Jenkins地址：http://172.18.234.180:20000/
sonar扫描代码：http://172.18.199.34:9000/
sonar扫描：

```
clean install sonar:sonar -Dsonar.host.url=http://172.18.199.34:9000/ -Dsonar.login=42b47be6ff981e6eb88ba96f82b906e946539003
```

风险Jenkins构建不报错，而项目运行时报错
解决办法：编写单元测试。去掉-DskipTests 跳过测试参数

