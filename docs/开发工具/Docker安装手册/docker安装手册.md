# 容器安装

## 1.离线安装docker 

**1.1 上传docker安装文件：**

	container-selinux-2.74-1.el7.noarch.rpm
	docker-ce-18.06.2.ce-3.el7.x86_64.rpm
**1.2 docker安装**

	rpm -ivh container-selinux-2.74-1.el7.noarch.rpm --nodeps --force
	rpm -ivh docker-ce-18.06.2.ce-3.el7.x86_64.rpm 

**1.3 配置非root用户执行docker权限**

	sudo groupadd docker 
	sudo gpasswd -a ${USER} docker 
	newgrp docker

**1.4 docker开机自动启动**

	systemctl enable docker
	systemctl start docker

## 2.在线安装docker （推荐）

https://docs.docker.com/engine/install/centos/

```
# yum 包更新
[root@centos7 ~]# yum -y update

# 卸载旧版本 Docker
[root@centos7 ~]# yum remove docker docker-common docker-selinux docker-engine

# 安装软件包
[root@centos7 ~]# yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加 Docker yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

#或者设置阿里云镜像源
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo 

# 指定版本安装Docker
[root@centos7 ~]# yum list docker-ce --showduplicates | sort -r  

[root@centos7 ~]# yum install -y docker-ce-18.09.6-3.el7
[root@centos7 ~]# yum install -y docker-ce-19.03.8-3.el7
# 启动 Docker
[root@centos7 ~]# systemctl start docker
[root@centos7 ~]# systemctl enable docker
# 查看 Docker 版本号
[root@centos7 ~]# docker --version
```

## 3.nvidiva-docker安装

https://www.cnblogs.com/wuchangsoft/p/9767074.html

```
curl -s -L https://nvidia.github.io/nvidia-docker/centos7/x86_64/nvidia-docker.repo | 
yum search --showduplicates nvidia-docker
yum install -y nvidia-docker-1.0.1-1.x86_64


systemctl start nvidia-docker
systemctl enable nvidia-docker
systemctl status nvidia-docker


nvidia-docker2 安装：
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.repo |   sudo tee /etc/yum.repos.d/nvidia-docker.repo
yum list nvidia-docker2 --showduplicates | sort -r
yum -y install nvidia-docker2
```



## 2.遇到问题&解决方案

### 2.1 Requires: container-selinux >= 2.9

这个报错是container-selinux版本低或者是没安装的原因
yum 安装container-selinux 一般的yum源又找不到这个包
需要安装epel源 才能yum安装container-selinux
然后在安装docker-ce就可以了：

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

#阿里云上的epel源
yum install -y epel-release

yum install -y container-selinux
```

### 4.2 Maximum supported API version is 1.39

```
vi /etc/profile  #结尾追加
export DOCKER_API_VERSION=1.39
source  /etc/profile  #使配置生效
```