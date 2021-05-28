# 容器安装

## nvidia-docker安装

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