# Nginx配置HTTPS

## 1、自行颁发不受浏览器信任的SSL证书

```
# 生成一个RSA密钥 
openssl genrsa -des3 -out aift.key 1024
 
# 拷贝一个不需要输入密码的密钥文件
openssl rsa -in aift.key -out aift_nopass.key
 
# 生成一个证书请求
openssl req -new -key aift.key -out aift.csr
 
# 自己签发证书
openssl x509 -req -days 3650 -in aift.csr -signkey aift.key -out aift.crt
```

## 2、修改Nginx配置

    nginx.conf
    
    server_name aift.teamshub.com;
    listen 443;
    ssl on;
    ssl_certificate /aidata/aicp/nginx/ssl/aift.crt;
    ssl_certificate_key /aidata/aicp/nginx/ssl/aift_nopass.key;


```
docker run -di --name=nginx-vuepress \
-p 9999:80 \
-p 9993:443 \
-v /aimanager/devops/nginx-vuepress/dist:/usr/share/nginx/html \
-v /aimanager/devops/nginx-vuepress/logs:/var/log/nginx/ \
-v /aimanager/devops/nginx-vuepress/ssl:/etc/ssl/ \
nginx:1.16.0

```

```
server {
        server_name localhost;
        listen 443;
        ssl on;
        ssl_certificate /etc/ssl/aift.crt;
        ssl_certificate_key /etc/ssl/aift_nopass.key;


        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

}
```

