## 1.聚类自运营接口

### 1.1 用户登录

访问URL：http://172.18.199.34:8082/feature/user/login

访问方式：POST

请求头：

​	Content-Type:application/json

请求参数：

```json
{
  "username": "15910541911",
  "password": "a123456789"
}
```

请求参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| username |  String  |   true   |  请求返回状态  |
| password |  String  |   true   | 请求返回Code码 |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": {
        "epLogin": {
            "ROOT": {
                "BODY": {
                    "DETAIL_MSG": "OK",
                    "OUT_DATA": {
                        "entity": "登录成功"
                    },
                    "PROMPT_MSG": "",
                    "REQUEST_ID": "20200424155031806_21859_37",
                    "RETURN_CODE": "0",
                    "RETURN_MSG": "OK",
                    "RUN_IP": "172.18.233.167",
                    "USER_MSG": "OK"
                }
            }
        },
        "token": "TOKEN:528145ae-e2f3-4834-8e98-a089b23b33d7"
    }
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |        参数说明         |
| :------: | :------: | :------: | :---------------------: |
| success  |   file   |   true   |      请求返回状态       |
|   code   |  String  |   true   |     请求返回Code码      |
|   msg    |  String  |   true   |      请求返回提示       |
|   data   |  Object  |   true   |      请求返回数据       |
|  token   |  String  |   true   | 后续接口所需的头部token |

### 1.2 新建活动

访问URL：http://172.18.199.34:8082/feature/opration/add

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "username": "用户名",
  "createMan": "创建人",
  "title": "活动标题",
  "desc": "活动描述",
  "time": ["2019-05-04T16:00:00.000Z", "2019-05-30T16:00:00.000Z"],
  "area": ["110101","110102","110105"],
  "content": [0,1,2,3],
  "analyticals": ["1204","1217","2003"]
}
```

请求参数说明：

|  参数名称   | 参数类型 | 是否必须 |   参数说明   |
| :---------: | :------: | :------: | :----------: |
|  username   |  String  |   true   |    用户名    |
|  createMan  |  String  |   true   |    创建人    |
|    title    |  String  |   true   |   活动标题   |
|    desc     |  String  |   true   |   活动描述   |
|    time     | [String] |   true   | 数据日期范围 |
|    area     | [String] |   true   |     区域     |
|   content   |  [Int]   |   true   |   聚类内容   |
| analyticals | [String] |   true   |  分析型指标  |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "创建活动请求提交成功",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.3 编辑活动

访问URL：http://172.18.199.34:8082/feature/opration/edit

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "editMan": "编辑人",
  "name": "活动标题",
  "desc": "活动描述",
  "time": ["2019-05-04T16:00:00.000Z", "2019-05-30T16:00:00.000Z"],
  "quoto": ["110101","110102","110105"],
  "con": [0,1,2,3],
  "analyticals": ["1204","1217","2003"],
  "dataId": 1,
  "operationId": 1
}
```

请求参数说明：

|  参数名称   | 参数类型 | 是否必须 |   参数说明   |
| :---------: | :------: | :------: | :----------: |
|   editMan   |  String  |   true   |    编辑人    |
|    name     |  String  |   true   |   活动标题   |
|    desc     |  String  |   true   |   活动描述   |
|    time     | [String] |   true   | 数据日期范围 |
|    quoto    | [String] |   true   |     区域     |
|     con     |  [Int]   |   true   |   聚类内容   |
| analyticals | [String] |   true   |  分析型指标  |
|   dataId    |   Int    |   true   |  数据范围ID  |
| operationId |   Int    |   true   |    活动ID    |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": null
}
{
    "success": false,
    "code": "0003",
    "msg": "参数错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.4 删除单条活动

访问URL：http://172.18.199.34:8082/feature/opration/delete/single

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "operationId": 1
}
```

请求参数说明：

|  参数名称   | 参数类型 | 是否必须 | 参数说明 |
| :---------: | :------: | :------: | :------: |
| operationId |   Int    |   true   |  活动ID  |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": null
}
{
    "success": false,
    "code": "0002",
    "msg": "系统错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.5 批量删除活动

访问URL：http://172.18.199.34:8082/feature/opration/delete/batch

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "operationIds": [111,112]
}
```

请求参数说明：

|   参数名称   | 参数类型 | 是否必须 |  参数说明  |
| :----------: | :------: | :------: | :--------: |
| operationIds |  [Int]   |   true   | 活动ID数组 |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": null
}
{
    "success": false,
    "code": "0002",
    "msg": "系统错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.6 查询活动-无条件

访问URL：http://172.18.199.34:8082/feature/opration

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "pagesize": 2,
  "pageNo":1
}
```

请求参数说明：

| 参数名称 | 参数类型 | 是否必须 |         参数说明          |
| :------: | :------: | :------: | :-----------------------: |
| pagesize |   Int    |   true   |        每页记录数         |
|  pageNo  |   Int    |   true   | 页数（实际页数，从1开始） |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": {
        "total": 7,
        "operations": [
            {
                "clusterCount": 1,
                "oprationDesc": "123",
                "createMan": "15910541911",
                "createTime": 1587518222000,
                "oprationDataCount": 754,
                "oprationId": 152,
                "oprationNum": "159105419111587518222149",
                "oprationStatus": "1",
                "updateTime": 1587518237000,
                "oprationTitle": "123"
            },
            {
                "clusterCount": 5,
                "oprationDesc": "测试提取和过滤关键词",
                "createMan": "15910541911",
                "createTime": 1585554284000,
                "oprationDataCount": 513,
                "oprationId": 151,
                "oprationNum": "159105419111585554284803",
                "oprationStatus": "1",
                "updateTime": 1585554289000,
                "oprationTitle": "limin"
            }
        ]
    }
}
```

返回参数说明：

|     参数名称      | 参数类型 | 是否必须 |     参数说明     |
| :---------------: | :------: | :------: | :--------------: |
|      success      |   file   |   true   |   请求返回状态   |
|       code        |  String  |   true   |  请求返回Code码  |
|        msg        |  String  |   true   |   请求返回提示   |
|       data        |  Object  |   true   |   请求返回数据   |
|       total       |   Int    |   true   |     记录总数     |
|    operations     | [Object] |   true   |     活动数组     |
|   clusterCount    |   Int    |   true   | 活动下的聚类数据 |
|   oprationDesc    |  String  |   true   |     活动描述     |
|     createMan     |  String  |   true   |      创建人      |
|    createTime     |   Int    |   true   |     创建时间     |
| oprationDataCount |   Int    |   true   |    活动工单量    |
|    oprationId     |   Int    |   true   |      活动ID      |
|    oprationNum    |  String  |   true   |     活动编号     |
|  oprationStatus   |  String  |   true   |     活动状态     |
|    updateTime     |   Int    |   true   |     更新时间     |
|   oprationTitle   |  String  |   true   |     活动标题     |

### 1.7 查询活动-有条件-标题和描述

访问URL：http://172.18.199.34:8082/feature/opration

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
  "pagesize": 2,
  "pageNo":1,
  "titleKw":"标题搜索关键词",
  "contentKw":"描述搜索关键词"
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 |         参数说明          |
| :-------: | :------: | :------: | :-----------------------: |
| pagesize  |   Int    |   true   |        每页记录数         |
|  pageNo   |   Int    |   true   | 页数（实际页数，从1开始） |
|  titleKw  |  String  |   true   |      标题搜索关键词       |
| contentKw |  String  |   true   |      描述搜索关键词       |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": {
        "total": 7,
        "operations": [
            {
                "clusterCount": 1,
                "oprationDesc": "123",
                "createMan": "15910541911",
                "createTime": 1587518222000,
                "oprationDataCount": 754,
                "oprationId": 152,
                "oprationNum": "159105419111587518222149",
                "oprationStatus": "1",
                "updateTime": 1587518237000,
                "oprationTitle": "123"
            },
            {
                "clusterCount": 5,
                "oprationDesc": "测试提取和过滤关键词",
                "createMan": "15910541911",
                "createTime": 1585554284000,
                "oprationDataCount": 513,
                "oprationId": 151,
                "oprationNum": "159105419111585554284803",
                "oprationStatus": "1",
                "updateTime": 1585554289000,
                "oprationTitle": "limin"
            }
        ]
    }
}
```

返回参数说明：

|     参数名称      | 参数类型 | 是否必须 |     参数说明     |
| :---------------: | :------: | :------: | :--------------: |
|      success      |   file   |   true   |   请求返回状态   |
|       code        |  String  |   true   |  请求返回Code码  |
|        msg        |  String  |   true   |   请求返回提示   |
|       data        |  Object  |   true   |   请求返回数据   |
|       total       |   Int    |   true   |     记录总数     |
|    operations     | [Object] |   true   |     活动数组     |
|   clusterCount    |   Int    |   true   | 活动下的聚类数据 |
|   oprationDesc    |  String  |   true   |     活动描述     |
|     createMan     |  String  |   true   |      创建人      |
|    createTime     |   Int    |   true   |     创建时间     |
| oprationDataCount |   Int    |   true   |    活动工单量    |
|    oprationId     |   Int    |   true   |      活动ID      |
|    oprationNum    |  String  |   true   |     活动编号     |
|  oprationStatus   |  String  |   true   |     活动状态     |
|    updateTime     |   Int    |   true   |     更新时间     |
|   oprationTitle   |  String  |   true   |     活动标题     |

### 1.8 查询指标

访问URL：http://172.18.199.34:8082/feature/analytical

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"indicatorsLevel":0
}
```

请求参数说明：

|    参数名称     | 参数类型 | 是否必须 |         参数说明         |
| :-------------: | :------: | :------: | :----------------------: |
| indicatorsLevel |   Int    |   true   | 指标等级(0为1级，1为2级) |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": [
        {
            "id": 1,
            "indicatorsName": "业务管理",
            "indicatorsCode": "11",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 2,
            "indicatorsName": "业务使用",
            "indicatorsCode": "12",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 3,
            "indicatorsName": "装移修机",
            "indicatorsCode": "13",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 4,
            "indicatorsName": "触点服务",
            "indicatorsCode": "14",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 5,
            "indicatorsName": "移动通信质量",
            "indicatorsCode": "15",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 6,
            "indicatorsName": "计费争议",
            "indicatorsCode": "16",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 7,
            "indicatorsName": "增值业务",
            "indicatorsCode": "17",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 8,
            "indicatorsName": "业务咨询及查询（升级投诉专用）",
            "indicatorsCode": "18",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 9,
            "indicatorsName": "客户表扬",
            "indicatorsCode": "19",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 10,
            "indicatorsName": "客户建议及需求",
            "indicatorsCode": "20",
            "parentCode": "-1",
            "indicatorsLevel": 0
        },
        {
            "id": 11,
            "indicatorsName": "外省问题",
            "indicatorsCode": "21",
            "parentCode": "-1",
            "indicatorsLevel": 0
        }
    ]
}
```

返回参数说明：

|    参数名称     | 参数类型 | 是否必须 |    参数说明    |
| :-------------: | :------: | :------: | :------------: |
|     success     |   file   |   true   |  请求返回状态  |
|      code       |  String  |   true   | 请求返回Code码 |
|       msg       |  String  |   true   |  请求返回提示  |
|      data       |  Object  |   true   |  请求返回数据  |
|       id        |   Int    |   true   |     指标ID     |
| indicatorsName  |  String  |   true   |  指标显示名字  |
| indicatorsCode  |  String  |   true   |   指标的code   |
|   parentCode    |  String  |   true   |    父指标ID    |
| indicatorsLevel |   Int    |   true   |   指标的等级   |

### 1.9 查询区域

访问URL：http://172.18.199.34:8082/feature/datarange/region/{regionId}

访问方式：GET

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```http
http://172.18.199.34:8082/feature/datarange/region/2
```

请求参数说明：

| 参数名称 | 参数类型 | 是否必须 |            参数说明             |
| :------: | :------: | :------: | :-----------------------------: |
| regionId |   Int    |   true   | 市级区域的ID(目前默认为2：北京) |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "成功",
    "data": [
        {
            "regionId": 10,
            "regionCode": "110111",
            "regionName": "房山区",
            "regionLevel": 3,
            "regionParentId": 2
        },
        {
            "regionId": 11,
            "regionCode": "110112",
            "regionName": "通州区",
            "regionLevel": 3,
            "regionParentId": 2
        },
        {
            "regionId": 12,
            "regionCode": "110113",
            "regionName": "顺义区",
            "regionLevel": 3,
            "regionParentId": 2
        },
        {
            "regionId": 13,
            "regionCode": "110114",
            "regionName": "昌平区",
            "regionLevel": 3,
            "regionParentId": 2
        },
        {
            "regionId": 14,
            "regionCode": "110115",
            "regionName": "大兴区",
            "regionLevel": 3,
            "regionParentId": 2
        },
        {
            "regionId": 15,
            "regionCode": "110116",
            "regionName": "怀柔区",
            "regionLevel": 3,
            "regionParentId": 2
        }
    ]
}
```

返回参数说明：

|    参数名称    | 参数类型 | 是否必须 |    参数说明    |
| :------------: | :------: | :------: | :------------: |
|    success     |   file   |   true   |  请求返回状态  |
|      code      |  String  |   true   | 请求返回Code码 |
|      msg       |  String  |   true   |  请求返回提示  |
|      data      |  Object  |   true   |  请求返回数据  |
|    regionId    |   Int    |   true   |     区域ID     |
|   regionCode   |  String  |   true   |    区域编码    |
|   regionName   |  String  |   true   |  页面显示名字  |
|  regionLevel   |   Int    |   true   |    区域等级    |
| regionParentId |   Int    |   true   |    父区域ID    |

### 1.10 活动信息展示

访问URL：http://172.18.199.34:8082/feature/datarange/show

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"oprationId":1
}
```

请求参数说明：

|  参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :--------: | :------: | :------: | :------: |
| oprationId |   Int    |   true   |  活动ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": {
		"datarangeInfo": {// 数据范围相关信息
			"dataId": 106,// 数据范围ID
			"oprationId": 112,// 活动ID
			"dataTimeFrom": 1556985600000,//数据范围起始时间
			"dataTimeTo": 1559232000000,//数据范围结束时间
			"regionIds": "110101,110102,110105",// 区域的编号
			"dataClusterContent": "0,1,2,3",// 聚类内容
			"createTime": 1583213997000,// 创建时间
			"createMan": "15910541911",// 创建人
			"analyticalIds": "1204,1217,2003",// 指标
			"dataRangeStaus": "1",// 数据范围状态
			"updateTime": 1583214011000// 更新时间
		},
		"ps": {// 一级指标集合
			"12": "业务使用",// 指标编码：展示名字 
			"20": "客户建议及需求"
		},
		"analyticals": {// 二级指标集合
			"12": [{// 父指标的编码
				"ccode": "1204",// 指标编码
				"pcode": "12",// 父指标编码
				"pname": "业务使用",// 父指标名字
				"cname": "手机无法主被叫",// 子指标名字
				"coun": 399// 子指标对应的工单量
			}]
		},
		"regionList": [{// 区域的集合
			"regionId": 3,// 区域ID
			"regionCode": "110101",// 区域编码
			"regionName": "二区",// 区域展示名字
			"regionLevel": 3,// 区域等级
			"regionParentId": 2// 父区域
		}],
		"totalCoun": 755,// 总的工单量
		"echartsX": ["其他", "手机无法主被叫", "举报诈骗电话/骚扰电话"],// echarts图X轴
		"echartsY": [242, 399, 114],// echarts图Y轴
		"showEditBtn": true//是否展示修改按钮
	}
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.11 聚类树展示

访问URL：http://172.18.199.34:8082/feature/cluster/tree/{oprationId}

访问方式：GET

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```http
http://172.18.199.34:8082/feature/cluster/tree/1
```

请求参数说明：

|  参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :--------: | :------: | :------: | :------: |
| oprationId |   Int    |   true   |  活动ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": [{
		"level": "1",// 聚类的等级
		"frequencyStatus": 2,// 计算词频状态:0未计算;1计算中;2计算完成
		"abstractStatus": 2,// 提取摘要状态:0未提取;1提取中;2提取完成
		"pid": -1,// 父聚类的ID
		"clusterId": 15,// 聚类ID
		"label": "1-1",// 聚类名称
		"type": "cluster",// 聚类树节点类型
		"keywordsStatus": 2,// 提取关键词状态:0未提取;1提取中;2提取完成
		"clusterTreeId": 3,// 聚类树节点ID
		"children": [{
			"label": "摘要",
			"clusterId": "15",
			"type": "abstract",
			"clusterTreeId": 4
		}, {
			"label": "关键词",
			"clusterId": "15",
			"type": "keyword",
			"clusterTreeId": 5
		}, {
			"label": "词频计算",
			"clusterId": "15",
			"type": "frequency",
			"clusterTreeId": 6
		}, {
			"level": 2,
			"frequencyStatus": 0,
			"children": [{
				"label": "摘要",
				"clusterId": "16",
				"type": "abstract",
				"clusterTreeId": 8
			}, ...],
			"abstractStatus": 2,
			"pid": 15,
			"clusterId": 16,
			"label": "2-1",
			"type": "cluster",
			"keywordsStatus": 0,
			"clusterTreeId": 7
		}]
	}]
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.12 新增一级聚类

访问URL：http://172.18.199.34:8082/feature/cluster/root/add

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"title":"聚类标题",
	"categoryNo":1,
	"operationId":1
}
```

请求参数说明：

|  参数名称   | 参数类型 | 是否必须 |   参数说明   |
| :---------: | :------: | :------: | :----------: |
|    title    |  String  |   true   |   聚类标题   |
| categoryNo  |   Int    |   true   | 聚类的类别数 |
| operationId |   Int    |   true   |    活动ID    |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "新增聚类请求提交成功",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.13 新增多级聚类

访问URL：http://172.18.199.34:8082/feature/cluster/sub/add

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"title":"聚类标题",
	"categoryNo":2,
	"operationId":1,
	"pCategoryCodes":[0, 1, 2],
	"parentClusterId":1
}
```

请求参数说明：

|    参数名称     | 参数类型 | 是否必须 |   参数说明   |
| :-------------: | :------: | :------: | :----------: |
|      title      |  String  |   true   |   聚类标题   |
|   categoryNo    |   Int    |   true   | 聚类的类别数 |
|   operationId   |   Int    |   true   |    活动ID    |
| pCategoryCodes  |  [Int]   |   true   | 父聚类的类别 |
| parentClusterId |   Int    |   true   |   父聚类ID   |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "新增聚类请求提交成功",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.14 聚类展示

访问URL：http://172.18.199.34:8082/feature/cluster/categories/count/{clusterId}

访问方式：GET

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```http
http://172.18.199.34:8082/feature/cluster/categories/count/1
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| clusterId |  String  |   true   |  聚类ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": {
		"tableDatas": [{// 列表数据
			"formCount": 747,// 工单量
			"categoryCode": 0// 聚类的类别
		},...],
		"showFrequency": true,// 是否显示计算词频按钮
		"echartsX": [0, 1, 2, 3, 4],// echarts图x轴
		"showKeyword": true,// 是否显示提取关键词按钮
		"echartsY": [747, 5, 1, 1, 1],// echarts图y轴
		"showAbstract": true// 是否显示提取摘要按钮
	}
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.15 提取摘要

访问URL：http://172.18.199.34:8082/feature/abstract/add

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"clusterId":12
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| clusterId |  String  |   true   |  聚类ID  |

返回参数：

```json
{
    "success": false,
    "code": "0003",
    "msg": "参数错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.16 摘要显示

访问URL：http://172.18.199.34:8082/feature/abstract/categories/{clusterId}

访问方式：GET

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```http
http://172.18.199.34:8082/feature/abstract/categories/1
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| clusterId |  String  |   true   |  聚类ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": [{
		"cluster_abstract_content": "客户自述：用户来...",// 摘要详情
		"create_time": 1579569249000,// 创建时间
		"cluster_abstract_id": 904,// 聚类类别与摘要记录的主键
		"abstract_id": 16,// 摘要主键
		"cluster_category_code": 0// 聚类类别
	}, ...]
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.17 提取关键词

访问URL：http://172.18.199.34:8082/feature/keyword/extract

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"operationId":1,
	"clusterId":12,
	"keywordsCount":1
}
```

请求参数说明：

|   参数名称    | 参数类型 | 是否必须 |  参数说明  |
| :-----------: | :------: | :------: | :--------: |
|  operationId  |   Int    |   true   |   活动ID   |
|   clusterId   |   Int    |   true   |   聚类ID   |
| keywordsCount |   Int    |   true   | 关键词数量 |

返回参数：

```json
{
    "success": false,
    "code": "0008",
    "msg": "已有关键词提取任务执行中,请您稍后操作",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.18 展示关键词

访问URL：http://172.18.199.34:8082/feature/keyword/show

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"clusterId":12
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| clusterId |   Int    |   true   |  聚类ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": {
		"keywordId": 20,// 过滤关键词ID
		"keywords": [{// 关键词记录
			"afterFilterKeywords": "办理",// 过滤后关键词
			"beforeFilterKeywords": "手机 状态 ...",// 过滤前关键词
			"categoryCode": 0// 聚类类别
		}, ...]
	}
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.19 过滤关键词

访问URL：http://172.18.199.34:8082/feature/keyword/filter

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"keywordId":12
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| keywordId |   Int    |   true   | 关键词ID |

返回参数：

```json
{
    "success": false,
    "code": "0002",
    "msg": "系统错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.20 计算词频

访问URL：http://172.18.199.34:8082/feature/keyword/frequency/count

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"keywordId":12,
	"clusterId":12
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| keywordId |   Int    |   true   | 关键词ID |
| clusterId |   Int    |   true   |  聚类ID  |

返回参数：

```json
{
    "success": false,
    "code": "0003",
    "msg": "参数错误",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.21 展示词频

访问URL：http://172.18.199.34:8082/feature/keyword/frequency/show

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"keywordId":12,
	"clusterId":12
}
```

请求参数说明：

| 参数名称  | 参数类型 | 是否必须 | 参数说明 |
| :-------: | :------: | :------: | :------: |
| keywordId |   Int    |   true   | 关键词ID |
| clusterId |   Int    |   true   |  聚类ID  |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": {
		"kwFormCount": [1392, 1275, ...],// echarts图Y轴工单数
		"total": 46,// 总条数
		"freqTableData": [{
			"keyword_count": 1392,// 次数
			"word": "网络",// 词
			"keyword_form_count": 1392,// 工单条数
			"cluster_category_code": 1// 聚类类别
		}, ...],
		"kwCount": [1392, 1275, ...],// echarts图Y轴次数
		"xKeywords": ["网络", "手机", ...]// echarts图X轴
	}
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.22 新增维护过滤词

访问URL：http://172.18.199.34:8082/feature/keyword/manage/save

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"keywordId":12,
	"clusterId":12
}
```

请求参数说明：

|   参数名称    | 参数类型 | 是否必须 | 参数说明 |
| :-----------: | :------: | :------: | :------: |
| reversedWords |  String  |   true   |  保留词  |
| noWantedWords |  String  |   true   |  停用词  |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "新增维护过滤词记录完成",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.23 维护过滤词列表展示

访问URL：http://172.18.199.34:8082/feature/keyword/manage/show

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
无
```

请求参数说明：

| 参数名称 | 参数类型 | 是否必须 | 参数说明 |
| :------: | :------: | :------: | :------: |
|    无    |          |          |          |

返回参数：

```json
{
	"success": true,
	"code": "0001",
	"msg": "成功",
	"data": [{
		"id": 54,// 维护过滤词记录ID
		"reversedWords": "22",// 保留词
		"noWantedWords": "34",// 停用词
		"createTime": 1583417299000,// 创建时间
		"createMan": "15910541911",// 创建人
		"wordsStatus": 1,// 维护过滤词记录可用状态
		"updateTime": 1583417299000// 更新时间
	}, ...]
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |

### 1.24 恢复维护过滤词记录

访问URL：http://172.18.199.34:8082/feature/keyword/manage/recovery

访问方式：POST

请求头：

​	Content-Type:application/json

​	token:"TOKEN:8a44d10f-1fe8-4eb9-b856-aa1326203067"

请求参数：

```json
{
	"id":1
}
```

请求参数说明：

| 参数名称 | 参数类型 | 是否必须 |     参数说明     |
| :------: | :------: | :------: | :--------------: |
|    id    |   Int    |   true   | 维护过滤词记录ID |

返回参数：

```json
{
    "success": true,
    "code": "0001",
    "msg": "恢复维护过滤词记录完成",
    "data": null
}
```

返回参数说明：

| 参数名称 | 参数类型 | 是否必须 |    参数说明    |
| :------: | :------: | :------: | :------------: |
| success  |   file   |   true   |  请求返回状态  |
|   code   |  String  |   true   | 请求返回Code码 |
|   msg    |  String  |   true   |  请求返回提示  |
|   data   |  Object  |   true   |  请求返回数据  |



### 