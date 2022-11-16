# KeyCloak保护应用和服务指引

# Securing Applications and Services Guide 中文版

>本文基于Keycloak官方[20.0.1版本文档](https://www.keycloak.org/docs/latest/securing_apps/index.html)翻译，部分删减。**翻译不易转载请注明出处！**

# 1. 保护应用程序和服务的规划

Keycloak支持OpenID Connect（OAuth 2.0的扩展）和SAML 2.0。在保护客户端和服务时，首先需要决定使用某一种协议。如果项目需要，还可以选择使用 OpenID Connect协议保护部分微服务，并使用 SAML协议保护其他微服务。

为了保护客户端和服务，需要为所选协议开发适配器。Keycloak提供自带的适配器， 但也可以使用OpenID Connect和 SAML 协议通用的程序库。

## 1.1. 客户端适配器

Keycloak 客户端适配器是使通过 Keycloak 保护应用程序变得非常容易的SDK。我们称呼他们适配器而不是代码库，因为它们提供了与底层平台和框架的紧密集成。这使得适配器易于使用，而且它所需编写的代码通常较少。

## 1.2. 支持的平台

Keycloak支持使用OpenID Connect和SAML协议保护在不同平台上运行并使用不同技术堆栈的应用程序。

### 1.2.1. OpenID Connect

- Java
    - JBoss EAP
    - WildFly
    - Tomcat
    - Jetty9
    - Servlet Filter
    - Spring Boot
    - Spring Security
- JavaScript（客户端）
    - JavaScript
- Node.js（服务器端）
    - Node.js 
- C#
    - OWIN(community
- Python
    - Oidc(generic)
- Android
    - AppAuth(generic)
- iOS
    - AppAuth(generic)
- Apache HTTP Server
    - mod_auth_openidc 

### 1.2.2. SAML

- Java
    - JBoss EAP
    - WildFly
    - Tomcat
    - Servlet Filter
    - Jetty
- Apache HTTP Server
     - mod_auth_openidc

## 1.3. 支持的协议

Keycloak支持OpenID Connect和SAML协议。

### 1.3.1. OpenID Connect

OpenID Connect（OIDC）是一种身份验证协议，是OAuth2.0的扩展。 虽然OAuth 2.0只是一个构建授权协议的框架，但OIDC是一个成熟的身份验证和授权协议。OIDC还大量使用JSON Web Token(JWT)标准集。这些标准定义了身份令牌 JSON 格式以及以紧凑且 Web 友好的方式对该数据进行数字签名和加密的方法。

使用 OIDC 时，实际上有两种类型的用例。第一种是通过Keycloak服务器为其应用上的用户进行身份验证。当认证成功登录后，应用程序将收到标识令牌（identity token）和访问令牌（access token）。标识令牌（identity token）包含有关用户的信息，例如用户名、电子邮件和其他配置文件信息。访问令牌（access token）由realm进行数字签名并包含访问信息（如用户角色映射），应用程序可以使用这些信息来确定允许用户访问应用程序上的哪些资源。

第二种类型的用例是客户端为远程服务授权。在这种情况下，客户端从 Keycloak 获取一个访问令牌（access token），它可以用来代表用户来调用其他远程服务。 Keycloak 对用户进行身份验证，然后请求用户同意授予对请求它的客户端的访问权限。然后客户端会接收访问令牌（access token）。此访问令牌（access token）由realm进行数字签名。客户端可以使用此访问令牌（access token）对远程服务进行 REST 调用。REST 服务提取访问令牌，验证令牌的签名，然后根据令牌内的访问信息决定是否处理请求。

### 1.3.2. SAML 2.0

SAML 2.0 是与 OIDC 类似的规范，但更老、更成熟。它源于 SOAP 和许多的 WS-* 规范，因此它往往比 OIDC 更冗长一些。SAML 2.0 主要是一种身份验证协议，通过在身份验证服务器和应用程序之间交换 XML 文档来工作。XML 签名和加密用于验证请求和响应。

在Keycloak中，SAML提供两种类型的用例：浏览器应用程序和REST调用。

第一个是通过 Keycloak 服务器为其应用上的用户验证身份。成功登录后，应用程序将收到一个 XML 文档，其中包含SAML assertion，它说明了有关用户的各种属性。这个XML 文档由realm进行数字签名，并包含访问信息（如用户角色映射），应用程序可以使用这些信息来确定允许用户访问应用程序上的哪些资源。

第二种类型的用例是客户端需访问远程服务的。在这种情况下，客户端通过Keycloak 获取 SAML assertion，它可用于代表用户调用其他远程服务。

### 1.3.3. OpenID Connect vs SAML

在OpenID Connect和SAML之间进行选择不仅仅是使用较新的协议（OIDC）而不是较旧的更成熟的协议（SAML）的问题。

在大多数情况下，Keycloak建议使用OIDC。SAML 往往比 OIDC 更冗长一些。

除了交换数据的冗长之外， OIDC 旨在与 Web 一起使用，而 SAML 被改造为在 Web 之上工作。 例如，OIDC 也更适合 HTML5/JavaScript 应用程序，因为它比 SAML 更容易在客户端实现。 由于令牌采用 JSON 格式，因此它们更容易被 JavaScript 使用。 而且通过OIDC可以更轻松地在 Web 应用程序中实现安全性。 例如，通过iframe来轻松确定用户是否处于登录状态。

SAML也有它的用途。当OIDC 规范不断发展时，它实现了 SAML 多年来拥有的越来越多的功能。人们之所以选择 SAML 而不是 OIDC，是因为认为它更成熟，并且已经通过SAML来保护现有的应用程序。

## 1.4. 术语

本指南中使用这些术语：

- `客户端`是与 Keycloak 交互以对用户进行身份验证并获取令牌的实体。大多数情况下，客户端是代表用户执行操作的应用程序和服务，它们为用户提供单一登录体验，并使用服务器颁发的令牌访问其他服务。客户端也可以是仅对获取令牌并代表自己访问其他服务感兴趣的实体。
- `应用`包括适用于每种协议的特定平台的各种应用程序
- `客户端适配器`是使用 Keycloak 轻松保护应用程序和服务的库。它们提供了与底层平台和框架的紧密集成。
- `创建客户端`和`注册客户端`是相同的操作。`创建客户端`是用于使用管理控制台创建客户端的术语,`注册客户端`是用于使用Keycloak客户端注册服务注册客户端的术语。
- `服务账号`是一种能够代表自己获取令牌的客户端。


## 1.5. 保护应用程序和服务的基本步骤

通过 Keycloak保护应用程序或服务的基本步骤如下：

1.	使用以下选项之一配置客户端：

- Keycloak Adapter
- 通用的 OpenID Connect或 SAML 库

2. 使用以下选项之一注册客户端：
- Keycloak 管理控制台
- 客户端注册服务
- Keycloak CLI

> 额外的资源<br/>
本指南提供了这些步骤的详细说明。相关信息请参见[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)。该指南提供了如何使用管理控制台创建客户端,创建客户端与使用Keycloak客户端注册服务注册客户端是相同的流程。

# 2. 使用 OpenID Connect协议保护应用程序和服务

本节介绍如何基于OpenID Connect协议并使用 Keycloak Adapter或通用 OpenID Connect 依赖库来保护应用程序和服务。

## 2.1. Java 适配器

Keycloak为Java应用程序提供了一系列不同的适配器。
所有 Java 适配器共享一组通用配置选项，这些选项在2.1.1中描述。

### 2.1.1. Java 适配器配置

Keycloak支持的每个Java适配器都可以通过一个简单的JSON文件进行配置， 如：

```json
{
  "realm" : "demo",
  "resource" : "customer-portal",
  "realm-public-key" : "MIGfMA0GCSqGSIb3D...31LwIDAQAB",
  "auth-server-url" : "https://localhost:8443",
  "ssl-required" : "external",
  "use-resource-role-mappings" : false,
  "enable-cors" : true,
  "cors-max-age" : 1000,
  "cors-allowed-methods" : "POST, PUT, DELETE, GET",
  "cors-exposed-headers" : "WWW-Authenticate, My-custom-exposed-Header",
  "bearer-only" : false,
  "enable-basic-auth" : false,
  "expose-token" : true,
  "verify-token-audience" : true,
  "credentials" : {
    "secret" : "234234-234234-234234"
  },

  "connection-pool-size" : 20,
  "socket-timeout-millis" : 5000,
  "connection-timeout-millis" : 6000,
  "connection-ttl-millis" : 500,
  "disable-trust-manager" : false,
  "allow-any-hostname" : false,
  "truststore" : "path/to/truststore.jks",
  "truststore-password" : "geheim",
  "client-keystore" : "path/to/client-keystore.jks",
  "client-keystore-password" : "geheim",
  "client-key-password" : "geheim",
  "token-minimum-time-to-live" : 10,
  "min-time-between-jwks-requests" : 10,
  "public-key-cache-ttl" : 86400,
  "redirect-rewrite-rules" : {
    "^/wsmaster/api/(.*)$" : "/api/$1"
  }
}
```

可以使用 `${...}`进行系统变量替换。 例如 `${jboss.server.config.dir}` 将被 `/path/to/Keycloak`替换。 通过 env 前缀也支持替换环境变量，例如`${env.MY_ENVIRONMENT_VARIABLE}`。

以下是每个配置选项的说明：

#### realm

>必填。

realm的名称。

#### resource

>必填

应用程序的客户端 ID。
每个应用程序都有一个用于标识应用程序的客户端 ID。

#### realm-public-key

> 可选，不建议设置它。

realm公钥的 PEM 格式。可以从管理控制台获取此信息。如果未设置，适配器将从 Keycloak 下载此内容，并在需要时重新下载它（例如，Keycloak 会旋转其密钥）。但是，如果设置了领域公钥，则适配器永远不会从Keycloak下载新密钥，适配器存在损坏的风险。

#### auth-server-url

> 必填

Keycloak 服务器的基本 URL。
所有其他 Keycloak 页面和 REST 服务端点都派生自此。它通常是形式。`https://host:port`

#### ssl-required

> 可选

确保与 Keycloak 服务器之间的所有通信都通过 HTTPS 进行。 
在生产中，应将其设置为`all`。

#### confidential-port

>可选
Keycloak 服务器用于通过 SSL/TLS 进行安全连接的端口。 

默认值为`8443`。


#### use-resource-role-mapping

> 可选

如果设置为 `true`，适配器将在token内查找用户的应用程序级角色映射。

如果为 `false`，它将在realm级别查看用户角色映射。

默认值为`false`。

#### public-client

>可选

如果设置为`true`，适配器将不会将客户端的凭据发送到Keycloak。

 默认值为`false`。

#### enable-cors

> 可选

这将启用 CORS 支持。它将处理 CORS 预检请求。它还将查看access token以确定有效的来源。

默认值为false。

#### cors-max-age

>可选

这将在header中设置 `Access-Control-Max-Age`的值。如果未设置，则不会在 CORS 响应中返回此header。

#### cors-allowed-method

>可选

如果启用了 CORS，这将设置 `Access-Control-Allow-Methods header`的值。这应该是一个逗号分隔的字符串。如果未设置，则不会在 CORS 响应中返回此header。

#### cors-allowed-headers

>可选

如果启用了 CORS，这将设置`Access-Control-Allow-Headers header`的值。这应该是一个逗号分隔的字符串。如果未设置，则不会在 CORS 响应中返回此header。

#### cors-exposed-headers

>可选

如果启用了 CORS，这将设置`Access-Control-Expose-Headers header`的值。这应该是一个逗号分隔的字符串。如果未设置，则不会在 CORS 响应中返回此header。

#### bearer-only

>可选

对于服务，这应该设置为 `true`。如果启用，适配器将不会尝试对用户进行身份验证，而只会验证bearer token。

默认值为`false`。

#### autodetect-bearer-only

如果应用程序同时服务于 Web 应用程序和 Web 服务（例如 SOAP 或 REST），则应将其设置为 `true`。 它允许将 Web 应用程序的未经身份验证的用户重定向到 Keycloak 登录页面，但将 `HTTP 401` 状态代码发送到未经身份验证的 SOAP 或 REST 客户端，因为它们无法理解到登录页面的重定向。
Keycloak 根据 `X-Requested-With`、`SOAPAction` 或 `Accept` 等典型header自动检测 SOAP 或 REST 客户端。

默认值为`false`。

#### enable-basic-auth

>可选

这会告知适配器也支持基本身份验证。如果启用此选项，则还必须提供secret。

默认值为`false`。

#### expose-token

>可选
如果为`true`，则经过身份验证的浏览器客户端（通过 JavaScript HTTP 调用）可以通过 URL:`root/k_query_bearer_token`获取签名的access token。

默认值为`false`。

#### credentials

仅适用于通过“Confidential”类型访问的客户端。指定应用程序的凭据。 这是一种对象表示法，其中键是凭证类型，值是凭证类型的值。 目前支持密码和 jwt。

#### connection-pool-size

>可选

这个配置选项定义了Keycloak 服务器的连接池大小。

 默认值为 `20`。

#### socket-timeout-mills

>可选

建立连接后socket等待数据的超时时间（以毫秒为单位）。两个数据包之间不活动的最长时间。超时值为零被解释为无限超时。负值被解释为未定义。

默认值为 `-1`。

#### connect-timeout-mills

与远程主机建立连接的超时时间，以毫秒为单位。超时值为零被解释为无限超时。负值被解释为未定义。

默认值为 `-1`。

#### connect-ttl-mills

>可选

客户端的连接生存时间（以毫秒为单位）。小于或等于零的值被解释为无限值。

默认值为 `-1`。

#### disable-trust-manager

>可选

如果 Keycloak 服务器需要 HTTPS 并且此配置选项设置为`true`，则不必指定信任库此设置应仅在开发期间使用，切勿在生产中使用，因为它将禁用 SSL 证书的验证。

默认值为`false`。

#### allow-any-hostname

>可选

如果 Keycloak 服务器需要 HTTPS 并且此配置选项设置为`true`，则 Keycloak 服务器的证书将通过信任库进行验证，但未完成主机名验证。此设置应仅在开发期间使用，切勿在生产中使用，因为它将禁用 SSL 证书的验证。
此设置在测试环境中可能很有用

默认值为`false`。

#### proxy-url

HTTP 代理的 URL（如果使用）。

#### truststore

> 当`ssl-required`是`none` 或者 `disable-trust-manager` 是`true`时必填

该值是truststore文件的文件路径。如果在路径前加上 classpath:，则truststore将从部署的类路径中获取。用于请求Keycloak服务器的HTTPS 通信。发出 HTTPS 请求的客户端需要一种方法来验证正在与之通信的服务器的主机。这就是truststore的作用。keystore包含一个或多个受信任的主机证书或证书颁发机构。可以通过提取 Keycloak 服务器的 SSLkcloak 服务器发出 HTTPS 请求时的双向 SSL 客户机证书。

#### client-keystore-password

> 如果设置了client-keystore，则必填。

client-keystore的密码。

#### client-key-password

> 如果设置了client-keystore，则必填。

客户端密钥的密码。

#### always-refresh-token

 如果为true，适配器将在每个请求中刷新token。
（启用后，将导致对应用程序的每个请求都向 Keycloak 发出请求。）

#### register-node-at-startup

如果为true，则适配器将向 Keycloak 发送注册请求。

 默认情况下为 false，仅在应用程序集群时才有用。

#### register-node-period

重新注册适配器到 Keycloak 的时间。

#### token-store

可能的值是 `session` 和 `cookie`。

默认是`session`，这意味着适配器将帐户信息存储在 HTTP 会话中。cookie 是指在 cookie 中存储信息。

#### token-cookie-path

使用 cookie 存储时，此选项设置用于存储帐户信息的 cookie 的路径。 如果它是相对路径，则假定应用程序在context根目录中运行。如果是绝对路径，那么绝对路径就是用来设置cookie路径的。

默认使用相对路径。

#### principal-attribute

用于填充`UserPrincipal`名称的`OpenID Connect ID Token`属性。 如果 token 属性为`null`，则默认为`sub`。 可能的值是`sub`、`preferred_username`、`email`、`name`、`nickname`、`given_name`、`family_name`。

#### turn-off-change-session-is-on-login

> 可选

默认情况下，session ID 在某些平台上成功登录时会更改，以插入安全攻击向量。

如果要关闭此功能，请将其更改为 true。

#### token-minimum-time-to-live

>可选

在过期之前使用 Keycloak 服务器刷新access token的时间量（以秒为单位）。 这在将accsee token发送到另一个 REST 客户端时特别有用。 此值不应超过realm的access token的生命周期。

默认值为 `0`秒，因此适配器将在access token过期时刷新它。

#### min-time-between-jwks-requests

时间量，以秒为单位，指定两次向 Keycloak 请求公钥之间的最小间隔。 

默认为 10 秒。当适配器识别出未知的令牌时，它将始终尝试下载新的公钥。但是，它不会每 10 秒尝试一次以上（默认情况下）。这是为了避免当攻击者发送大量损坏的令牌强制适配器向 Keycloak 发送大量请求时的 DoS。

#### public-key-cache-ttl

时间量，以秒为单位，指定两次向 Keycloak 请求检索新公钥之间的最大间隔。

默认为 `86400` 秒（1 天）。当适配器识别出未知的令牌时，它将始终尝试下载新的公钥。如果它识别出已知的令牌，它将只使用之前下载的公钥。但是，即使令牌有效，每个配置的时间间隔（默认为 1 天）至少会下载一次新的公钥。

#### ignore-oauth-query-parameter

默认为 false，如果设置为 true，将关闭对bearer token处理的 access_token 查询参数的处理。如果用户只传入 access_token，将无法进行身份验证。

#### redirect-rewrite-rules

如果需要，请指定重定向 URI 重写规则。 这是一种对象表示法，其中键是重定向 URI 要匹配的正则表达式，值是替换字符串。$字符可用于替换字符串中的反向引用。

#### verify-token-audience

如果设置为 true，则在使用不记名令牌进行身份验证期间，适配器将验证令牌是否包含此客户端名称（资源）作为受众。 该选项对于服务特别有用，这些服务主要服务于通过不记名令牌进行身份验证的请求。 

默认情况下设置为 false，但是为了提高安全性，建议启用它。

### 2.1.2 SpringBoot适配器

#### 安装 Spring Boot Adapter

为了能够保护 Spring Boot 应用程序，必须将 Keycloak Spring Boot 适配器 JAR 添加到应用程序中。 然后，必须通过 Spring Boot配置（application.properties）提供一些额外的配置。

Keycloak Spring Boot 适配器利用了 Spring Boot 的自动配置功能，因此仅需将此适配器 Keycloak Spring Boot Starter添加到项目中。

**步骤**：

1.	通过Maven 将以下内容添加到依赖项中：

```xml
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-spring-boot-starter</artifactId>
</dependency>
```

2.	添加适配器 BOM 依赖项：

```xml
<dependencyManagement>
	<dependencies>
	<dependency>
		<groupId>org.keycloak.bom</groupId>
		<artifactId>keycloak-adapter-bom</artifactId>
		<version>20.0.0</version>
		<type>pom</type>
		<scope>import</scope>
	</dependency>
	</dependencies>
</dependencyManagement>
```

目前支持以下嵌入式容器，如果使用 Starter，则不需要任何额外的依赖项：

- Tomcat
- Undertow
- Jetty

#### 配置 Spring Boot Adapter

通过以下步骤为Spring Boot应用程序配置Keycloak：

**步骤**

1.	通过正常的 Spring Boot 配置为 Spring Boot 适配器配置realm，而不是`keycloak.json`文件。 

例如：

```json
keycloak.realm = demorealm
keycloak.auth-server-url = http://127.0.0.1:8080
keycloak.ssl-required = external
keycloak.resource = demoapp
keycloak.credentials.secret = 11111111-1111-1111-1111-111111111111
keycloak.use-resource-role-mappings = true
```

可以通过设置 keycloak.enabled = false 来禁用 Keycloak Spring Boot Adapter（例如在测试中）。

2.	要配置 Policy Enforcer，与 keycloak.json 不同，使用 policy-enforcer-config 而不仅仅是 policy-enforcer。

3.	通常在 web.xml 中确认 Jakarta EE 安全配置。

Spring Boot Adapter 会将`login-method`登录方法设置为 KEYCLOAK 并在启动时配置`security-constraints`安全约束。 这是一个示例配置：

```json
	keycloak.securityConstraints[0].authRoles[0] = admin
	keycloak.securityConstraints[0].authRoles[1] = user
	keycloak.securityConstraints[0].securityCollections[0].name = insecure stuff
	keycloak.securityConstraints[0].securityCollections[0].patterns[0] = /insecure
	keycloak.securityConstraints[1].authRoles[0] = admin
	keycloak.securityConstraints[1].securityCollections[0].name = admin stuff
	keycloak.securityConstraints[1].securityCollections[0].patterns[0] = /admin
```

>如果计划将 Spring 应用程序部署为 WAR，则不应使用 Spring 引导适配器，而应使用正在使用的应用程序服务器或 servlet 容器的专用适配器。Spring Boot 还应该包含`web.xml`文件。

### 2.1.3. Tomcat 8 和 9 适配器

为了能够保护部署在 Tomcat 8 和 9 上的 WAR 应用程序，请将 Keycloak Tomcat 适配器安装到 Tomcat中。 然后，执行额外的配置以保护部署到 Tomcat 的每个 WAR。

#### 安装适配器

适配器需单独下载。

**步骤：**

1.	从下载站点下载对应Tomcat版本的适配器。

-	在 Tomcat 8 或 9 上安装：

```bash
	$ cd $TOMCAT_HOME/lib
	$ unzip keycloak-tomcat-adapter-dist.zip
```

#### 确保war包安全

本节介绍如何通过在 WAR 包中添加配置和编辑文件来直接保护 WAR。

**步骤：**

1.	在 WAR 包中创建文件`META-INF/context.xml`

这是一个 Tomcat 特定的配置文件，必须定义一个 Keycloak 特定的 Valve。

```xml
<Context path="/your-context-path">
	<Valve className="org.keycloak.adapters.tomcat.Keyclo
akAuthenticatorValve"/>
</Context>
```

2.	在 WAR 的`WEB-INF`目录中创建一个`keycloak.json`适配器配置文件。

2.1.1中详细阐述了配置规范

3.	指定登录配置并使用标准 servlet 安全性来指定 URL 上基于角色的约束。

下面是一个示例：

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
	version="3.0">

		 <module-name>customer-portal</module-name>
	<security-constraint>
		<web-resource-collection>
			<web-resource-name>
				Customers
			</web-resource-name>
			<url-pattern>/*</url-pattern>
		</web-resource-collection>
		<auth-constraint>
			<role-name>user</role-name>
		</auth-constraint>
	</security-constraint>

	<login-config>
		<auth-method>BASIC</auth-method>
		<realm-name>
			this is ignored currently
		</realm-name>
	</login-config>

	<security-role>
		<role-name>admin</role-name>
	</security-role>
	<security-role>
		<role-name>user</role-name>
	</security-role>
</web-app>
```

### 2.1.4. Spring Security适配器

要使用 Spring Security 和 Keycloak 保护应用程序，请将此适配器作为依赖项添加到项目中。然后，在 Spring Security 配置文件中提供一些额外的 bean，并将 Keycloak Security filter添加到配置中。

与其他 Keycloak 适配器不同，不应在 web.xml 中进行配置。但是，keycloak.json是必需的。为了使单点登出正常工作，必须定义一个session listener。

session listener定义如下：

- 在 web.xml 中（对于纯 Spring Security环境）：

```xml
<listener>
     <listener-class>org.springframework.security.web.session.HttpSessionEventPublisher</listener-class>
</listener>
```

-	作为 Spring Bean（在使用 Spring Security适配器的 Spring Boot环境中）


```java
@Bean
public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
    return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
}
```

#### 安装适配器

将Keycloak Spring Security适配器作为依赖项添加到Maven POM或Gradle。

```xml
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-spring-security-adapter</artifactId>
    <version>19.0.3</version>
</dependency>
```

#### 配置 Spring Security适配器

Keycloak Spring Security 适配器利用了 Spring Security 灵活的安全配置语法。

1. Java配置

Keycloak 提供了一个`KeycloakWebSecurityConfigurerAdapter`作为创建`WebSecurityConfigurer实例`的方便基类。该实现允许通过重写方法进行自定义。 虽然不需要使用它，但它极大地简化了安全上下文配置。

```java
@KeycloakConfiguration
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter
{
    /**
     * Registers the KeycloakAuthenticationProvider with the authentication manager.
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(keycloakAuthenticationProvider());
    }

    /**
     * Defines the session authentication strategy.
     */
    @Bean
    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(buildSessionRegistry());
    }

    @Bean
    protected SessionRegistry buildSessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        super.configure(http);
        http
                .authorizeRequests()
                .antMatchers("/customers*").hasRole("USER")
                .antMatchers("/admin*").hasRole("ADMIN")
                .anyRequest().permitAll();
    }
}
```

必须提供一个会话身份验证策略 bean，对于`public`或`confidential`应用程序应该是 `RegisterSessionAuthenticationStrategy`类型，对于`bearer-only`应用程序应该是 `NullAuthenticatedSessionStrategy`。

Spring Security目前`SessionFixationProtectionStrategy`不受支持，因为它在通过Keycloak登录后更改会话标识符。 如果会话标识符发生更改，通用注销将不起作用，因为 Keycloak 不知道新的会话标识符。

>`@KeycloakConfiguration`这个注释是一种元数据注释，它定义了集成Spring Security所需的所有KeyCloak注释。如果有一个复杂的 Spring Security设置，可以简单地看看`@KeycloakConfiguration`注解并创建自定义元注释或仅使用特定的 Spring 注释用于KeyCloak适配器。


2. XML 配置

虽然 Spring Security 的 XML 命名空间简化了配置，但自定义配置可能有点冗长。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:security="http://www.springframework.org/schema/security"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/security
       http://www.springframework.org/schema/security/spring-security.xsd">

    <context:component-scan base-package="org.keycloak.adapters.springsecurity" />

    <security:authentication-manager alias="authenticationManager">
        <security:authentication-provider ref="keycloakAuthenticationProvider" />
    </security:authentication-manager>

    <bean id="adapterDeploymentContext" class="org.keycloak.adapters.springsecurity.AdapterDeploymentContextFactoryBean">
        <constructor-arg value="/WEB-INF/keycloak.json" />
    </bean>

    <bean id="keycloakAuthenticationEntryPoint" class="org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationEntryPoint">
        <constructor-arg ref="adapterDeploymentContext" />
    </bean>
    <bean id="keycloakAuthenticationProvider" class="org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider" />
    <bean id="keycloakPreAuthActionsFilter" class="org.keycloak.adapters.springsecurity.filter.KeycloakPreAuthActionsFilter" />
    <bean id="keycloakAuthenticationProcessingFilter" class="org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter">
        <constructor-arg name="authenticationManager" ref="authenticationManager" />
    </bean>
    <bean id="keycloakSecurityContextRequestFilter"
          class="org.keycloak.adapters.springsecurity.filter.KeycloakSecurityContextRequestFilter" />

<bean id="keycloakSecurityContextRequestFilter"
     class="org.keycloak.adapters.springsecurity.filter.KeycloakSecurityContextRequestFilter" />

    <bean id="keycloakLogoutHandler" class="org.keycloak.adapters.springsecurity.authentication.KeycloakLogoutHandler">
        <constructor-arg ref="adapterDeploymentContext" />
    </bean>

    <bean id="logoutFilter" class="org.springframework.security.web.authentication.logout.LogoutFilter">
        <constructor-arg name="logoutSuccessUrl" value="/" />
        <constructor-arg name="handlers">
            <list>
                <ref bean="keycloakLogoutHandler" />
                <bean class="org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler" />
            </list>
        </constructor-arg>
        <property name="logoutRequestMatcher">
            <bean class="org.springframework.security.web.util.matcher.AntPathRequestMatcher">
                <constructor-arg name="pattern" value="/sso/logout**" />
                <constructor-arg name="httpMethod" value="GET" />
            </bean>
        </property>
    </bean>

    <security:http auto-config="false" entry-point-ref="keycloakAuthenticationEntryPoint">
        <security:custom-filter ref="keycloakPreAuthActionsFilter" before="LOGOUT_FILTER" />
        <security:custom-filter ref="keycloakAuthenticationProcessingFilter" before="FORM_LOGIN_FILTER" />
        <security:custom-filter ref="keycloakSecurityContextRequestFilter" after="FORM_LOGIN_FILTER" />
        <security:intercept-url pattern="/customers**" access="ROLE_USER" />
        <security:intercept-url pattern="/admin**" access="ROLE_ADMIN" />
        <security:custom-filter ref="logoutFilter" position="LOGOUT_FILTER" />
    </security:http>

</beans>
```

#### 多租户

Keycloak Spring Security 适配器还支持多租户。 与其注入`AdapterDeploymentContextFactoryBean`路径到`keycloak.json` ，不如注入`KeycloakConfigResolver` 接口的实现。 有关如何`KeycloakConfigResolver`实现的更多详细信息，请参阅多租户章节。 

#### 命名安全角色

Spring Security在使用基于角色的身份验证时，要求角色名称以`ROLE_`开头。 例如，管理员角色必须在 Keycloak中声明`ROLE_ADMIN`或者类型，而不是简单地声明`ADMIN`。

`org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider`类支持一个`org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper`可选项于将来自 Keycloak 的角色映射到 Spring  Security识别的角色。 例如，`org.springframework.security.core.authority.mapping.SimpleAuthorityMapper`使用插入前缀`ROLE_`并将角色名称转换为大写。  这个类是 Spring Security核心模块的一部分

#### 客户端到客户端支持

为了简化客户端之间的通信，Keycloak提供了Spring的`RestTemplate`扩展，处理`bearer token`身份验证。 要启用此功能， security配置必须添加`KeycloakRestTemplate bean`。 请注意，必须限定scoped为`prototype`才能正常运行。

- 对于 Java 配置：

```java
@Configuration
@EnableWebSecurity
@ComponentScan(basePackageClasses = KeycloakSecurityComponents.class)
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

    ...

    @Autowired
    public KeycloakClientRequestFactory keycloakClientRequestFactory;

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public KeycloakRestTemplate keycloakRestTemplate() {
        return new KeycloakRestTemplate(keycloakClientRequestFactory);
    }

    ...
}
```

- 对于 XML 配置：

```xml
<bean id="keycloakRestTemplate" class="org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate" scope="prototype">
    <constructor-arg name="factory" ref="keycloakClientRequestFactory" />
</bean>
然后，应用程序代码可以使用它需要调用另一个客户端的任何时间。 例如：KeycloakRestTemplate

@Service
public class RemoteProductService implements ProductService {

    @Autowired
    private KeycloakRestTemplate template;

    private String endpoint;

    @Override
    public List<String> getProducts() {
        ResponseEntity<String[]> response = template.getForEntity(endpoint, String[].class);
        return Arrays.asList(response.getBody());
    }
}

```

#### Spring Boot集成

Spring Boot和 Spring Security适配器可以组合使用。

如果使用 Keycloak Spring Boot Starter 来使用 Spring Security适配器，则只需添加 Spring Security 启动器：

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

- 使用 Spring Security配置

默认情况下，Spring Security Adapter查找`keycloak.json`配置文件。可以通过添加以下bean 来确保它查看 SpringBootAdapter提供的配置：

```java
@Bean
public KeycloakConfigResolver keycloakConfigResolver() {
    return new KeycloakSpringBootConfigResolver();
}
避免双重 Bean 注册
 Spring Boot 尝试使用 Web 应用程序context注册过滤器 bean。 因此，在 Spring Boot 环境中运行 Keycloak Spring Security 适配器时，可能需要将 FilterRegistrationBeans 添加到您的安全配置中，以防止 Keycloak 过滤器被注册两次。
Spring Boot 2.1 还默认禁用 spring.main.allow-bean-definition-overriding。 这意味着如果扩展 KeycloakWebSecurityConfigurerAdapter 的配置类注册了一个已被 @ComponentScan 检测到的 bean，则会遇到 BeanDefinitionOverrideException。 可以通过覆盖注册以使用特定的@ConditionalOnMissingBean 注释来避免，就像下面的 HttpSessionManager 一样。
@Configuration
@EnableWebSecurity
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter
{
    ...

    @Bean
    public FilterRegistrationBean keycloakAuthenticationProcessingFilterRegistrationBean(
            KeycloakAuthenticationProcessingFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean keycloakPreAuthActionsFilterRegistrationBean(
            KeycloakPreAuthActionsFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean keycloakAuthenticatedActionsFilterBean(
            KeycloakAuthenticatedActionsFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean keycloakSecurityContextRequestFilterBean(
        KeycloakSecurityContextRequestFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    @Bean
    @Override
    @ConditionalOnMissingBean(HttpSessionManager.class)
    protected HttpSessionManager httpSessionManager() {
        return new HttpSessionManager();
    }
    ...
}

```

### 2.1.5. Java servlet filter适配器

如果在没有 Keycloak 适配器的平台上部署 Java Servlet 应用程序，可以选择使用 servlet 过滤器适配器。此适配器的工作方式与其他适配器略有不同，不在 web.xml 中定义安全约束。相反，使用 Keycloak servlet filter适配器定义过滤器映射，以保护需要保护的 url。

>后端注销的工作方式与标准适配器略有不同。 它不会使 HTTP session失效，而是将session ID 标记为已注销。 没有标准方法可以使基于session ID 的 HTTP session失效。

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
      version="3.0">

        <module-name>application</module-name>

    <filter>
        <filter-name>Keycloak Filter</filter-name>
        <filter-class>org.keycloak.adapters.servlet.KeycloakOIDCFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>Keycloak Filter</filter-name>
        <url-pattern>/keycloak/*</url-pattern>
        <url-pattern>/protected/*</url-pattern>
    </filter-mapping>
</web-app>
```

在上面的代码段中，有两种 url 模式。/protected/* 是我们想要保护的文件，而 /keycloak/*url-pattern 处理来自 Keycloak 服务器的回调。

如果需要在配置的 url-patterns 下排除一些路径，可以使用`Filter init-param keycloak.config.skipPattern`配置一个正则表达式，该表达式描述 keycloak 过滤器应立即委托给过滤器链的路径模式。默认情况下没有配置 skipPattern。

模式与没有上下文路径的 requestURI 匹配。 给定上下文路径`/myapp`对`/myapp/index.html`的请求将与`/index.html`与跳过模式相匹配。

```xml
<init-param>
    <param-name>keycloak.config.skipPattern</param-name>
    <param-value>^/(path1|path2|path3).*</param-value>
</init-param>
```

请注意，应该在 Keycloak 管理控制台中使用指向过滤器的 url-pattern 覆盖的安全部分的管理 URL 配置客户端。

Admin URL 将对 Admin URL 进行回调以执行反向通道注销等操作。 因此，此示例中的 Admin URL 应为 `http[s]://hostname/{context-root}/keycloak`。

如果需要自定义sessionID映射器，可以在`Filter init-param keycloak.config.idMapper`中配置类的全名。 session ID 映射器是一个映射器，用于映射用户 ID 和session ID。 默认配置 `org.keycloak.adapters.spi. InMemorySessionIdMapper`。

```xml
<init-param>
    <param-name>keycloak.config.idMapper</param-name>
    <param-value>org.keycloak.adapters.spi.InMemorySessionIdMapper</param-value>
</init-param>
```

Keycloak 过滤器与其他适配器具有相同的配置参数，但必须将它们定义为过滤器初始化参数而不是context参数。

要使用此过滤器，请在您的 WAR pom 中包含此 maven 工件

```xml
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-servlet-filter-adapter</artifactId>
    <version>20.0.0</version>
</dependency>
```

### 2.1.6. Security Context 

如果需要直接访问令牌，则可以使用`KeycloakSecurityContext`接口。例如可以从令牌中检索其他详细信息（例如用户配置文件信息），或者想调用受 Keycloak 保护的 RESTful 服务。

在 servlet 环境中，它作为`HttpServletRequest`中的属性在安全调用中可用：

```java
httpServletRequest
    .getAttribute(KeycloakSecurityContext.class.getName());
```

或者，它在 HttpSession 中的不安全请求中可用：

```java
httpServletRequest.getSession()
    .getAttribute(KeycloakSecurityContext.class.getName());
```

### 2.1.7. 错误处理

Keycloak 为基于 servlet 的客户端适配器提供了一些错误处理工具。 当认证遇到错误时，Keycloak 会调用`HttpServletResponse.sendError()`。 可以在`web.xml`文件中设置错误页面来处理您想要的错误。 Keycloak 可以抛出 `400`、`401`、`403` 和 `500` 错误。

```xml
<error-page>
    <error-code>403</error-code>
    <location>/ErrorHandler</location>
</error-page>
```

Keycloak 还设置了一个可以检索的`HttpServletRequest`属性。 属性名称是 `org.keycloak.adapters.spi.AuthenticationError`，应该转换为`org.keycloak.adapters.OIDCAuthenticationError`。

例如：

```java
import org.keycloak.adapters.OIDCAuthenticationError;
import org.keycloak.adapters.OIDCAuthenticationError.Reason;
...

OIDCAuthenticationError error = (OIDCAuthenticationError) httpServletRequest
    .getAttribute('org.keycloak.adapters.spi.AuthenticationError');

Reason reason = error.getReason();
System.out.println(reason.name());
```

2.1.8. 注销

可以通过多种方式注销 Web 应用程序。 对于 Jakarta EE servlet 容器，可以调用 `HttpServletRequest.logout()`。 对于其他浏览器应用程序，可以将浏览器重定向到 `http://auth-server/realms/{realm-name}/protocol/openid-connect/logout`，如果该用户与其浏览器进行 SSO 会话，则会将用户注销。 一旦用户确认注销，实际注销就完成了。 

可以选择包含参数，例如 `id_token_hint`、`post_logout_redirect_uri`、`client_id` 和 [`OpenID Connect RP-Initiated Logout`](https://openid.net/specs/openid-connect-rpinitiated-1_0.html) 中所述的其他参数。 因此，如果包含`id_token_hint`参数，则不需要用户明确确认该注销。注销后，只要提供了用户，就会自动重定向到指定的 `post_logout_redirect_uri`。请注意，如果包含`post_logout_redirect_uri`，则需要包含 `client_id`或`id_token_hint`参数。

当使用`HttpServletRequest.logout()`选项时，适配器对传递refresh token的 Keycloak 服务器执行反向通道 POST 调用。 如果从不受保护的页面（不检查有效token的页面）执行该方法，则refresh token可能不可用，在这种情况下，适配器会跳过调用。 因此，建议使用受保护的页面来执行`HttpServletRequest.logout()`，以便始终考虑当前token，并在需要时执行与 Keycloak 服务器的交互。

### 2.1.9. 参数转发

Keycloak 初始授权端点请求支持各种参数。大多数参数在 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)中都有描述。一些参数是由适配器根据适配器配置自动添加的。但是，也有一些参数可以在每次调用的基础上添加。当打开受保护的应用程序 URI 时，可以将特定参数转发到 Keycloak 授权端点。

例如，如果请求离线tooken，则可以使用如下scope参数打开受保护的应用程序 URI：

```
http://myappserver/mysecuredapp?scope=offline_access
```

并且参数scope=offline_access将自动转发到 Keycloak authorization endpoint。

支持的参数包括：

- scope    
    使用以空格分隔的scope列表。以空格分隔的列表通常引用在特定客户端上定义的客户端scope。例如，如果输入scope选项地址电话，那么对 Keycloak 的请求将包含参数 scope=openid 地址电话。

-	prompt 
    
    Keycloak 支持以下设置：

    - `login`
    
    SSO将被忽略，并且将始终显示Keycloak登录页面，即使用户已经过身份验证
    
    - `consent`
    
    仅适用于设置Consent Required的客户端。如果使用，将始终显示“同意”页面， 即使用户之前已同意此客户端。

    - `none`
    
    登录页面将永远不会显示;相反，用户将被重定向到应用程序，如果用户尚未通过身份验证。此设置允许您在应用程序端创建过滤器/拦截器并向用户显示自定义错误页面。
    
- max_age 

`maxAge`仅在用户已通过身份验证时使用。指定身份验证持续允许的最大时间，测量 从用户进行身份验证时开始。如果用户的身份验证时间超过此时间，则会忽略 SSO，并且必须重新进行身份验证。

-	login_hint 

用于预先填写登录表单上的用户名/电子邮件字段。

- kc_idp_hint 

用于告诉 Keycloak 跳过显示登录页面并自动重定向到指定的标识提供者。
更多信息参考[Identity Provider 文档](https://www.keycloak.org/docs/latest/server_admin/#_client_suggested_idp)。

大多数参数在[OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)中都有描述。 唯一的例外是`kc_idp_hint` `Identity Brokering`参数，它特定于 Keycloak，包含要自动使用的身份提供程序的名称。 有关详细信息，请参阅[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)中的部分。

> 如果使用附加的参数打开 URL，则适配器不会将重定向到 Keycloak（如果已经过身份验证） 在应用程序中。例如，打开`http://myappserver/mysecuredapp?prompt=login` 不会自动将重定向到 Keycloak 登录页面,如果已通过应用程序`mysecuredapp`的身份验证。将来可能会更改此行为。


### 2.1.10. 客户端认证


当可信OIDC 客户端需要发送后端请求（例如，通过授权码交换token或刷新token）时，需要针对Keycloak服务器进行身份验证。默认情况下，可以通过三种方式对客户端进行身份验证：客户端 ID 和客户端密码、使用签名 JWT 进行客户端身份验证或使用客户端密码和签名 JWT 进行客户端身份验证。

#### 客户端 ID 和客户端密钥

这是 OAuth2 规范中描述的传统方法。客户端有一个Adapter（应用程序）和 Keycloak 服务器都需要知道的密钥。可以在 Keycloak 管理控制台中为特定客户端生成密钥，然后将此密钥粘贴到应用程序端的`keycloak.json`文件中：

```json
"credentials": {
    "secret": "19666a4f-32dd-4049-b082-684c74115f28"
}
```

#### 使用签名 JWT 进行客户端身份验证

这是基于 `RFC7523`规范。它的工作原理是这样的：

- 客户端必须具有私钥和证书。对于 Keycloak，这可以通过 keystore 获得，该文件可以在客户端应用程序的类路径上或文件系统上的某个位置使用。

- 户端应用程序启动后，假设`http://myhost.com/myapp`是客户端应用程序的基本URL，允许使用诸如`http://myhost.com/myapp/k_wks` 之类的URL下载其JWKS 格式的公钥。

- 在身份验证期间，客户端生成一个 JWT 令牌，并使用其私钥对其进行签名，然后在client_assertion参数中的特定后端请求（例如，授权码换Token）中将其发送到Keycloak。

- Keycloak 必须具有客户端的公钥或证书，以便验证 JWT 上的签名。在 Keycloak 中，需要为客户端配置客户端凭据。首先，在管理控制台的选项卡中选择对客户端进行身份验证的方法。然后，在选项卡中选择以下任一选项：

    - 配置JWKS URL，Keycloak 可以在其中下载客户端的公钥。这可以是 URL 例如 `http://myhost.com/myapp/k_jwks`。此选项是最灵活的，因为客户端可以随时轮换其密钥，然后Keycloak始终在需要时下载新密钥，而无需更改配置。更准确地说，Keycloak 在看到由未知（密钥 ID）签名的令牌时会下载新密钥。
    
    - 以 PEM 格式、JWK 格式或从密钥库上传客户机的公钥或证书。使用此选项时，公钥是硬编码的，并且在客户端生成新密钥对时必须更改。

对于适配器端的设置，需要在`keycloak.json`文件中具有类似以下内容：

```json
"credentials": {
  "jwt": {
    "client-keystore-file": "classpath:keystore-client.jks",
    "client-keystore-type": "JKS",
    "client-keystore-password": "storepass",
    "client-key-password": "keypass",
    "client-key-alias": "clientkey",
    "token-expiration": 10
  }
}
```

使用此配置，密钥库文件`keystore-client.jks`必须在 WAR 的类路径中可用。 如果不使用前缀类路径：需指向运行客户端应用程序的文件系统上的任何文件。

#### 使用客户端密钥和签名 JWT 进行客户端身份验证

这与使用签名 JWT 的客户端身份验证相同，只是使用客户端密码而不是私钥和证书。
客户端有一个Adapter（应用程序）和 Keycloak 服务器都知道的密钥。需要在管理控制台的选项卡中选择对客户端进行身份验证的方法，然后将此密钥粘贴到应用程序端的`keycloak.json`文件中：

```json
"credentials": {
  "secret-jwt": {
    "secret": "19666a4f-32dd-4049-b082-684c74115f28",
    "algorithm": "HS512"
  }
}
```

**algorithm**字段指定使用客户端密码的签名 JWT 的算法。
它必须是以下值之一：`HS256`、`HS384` 和 `HS512`。

此**algorithm**字段是可选的，因此如果文件中不存在**algorithm**字段，则会自动应用 `HS256`。

#### 2.1.11. 多租户

在上下文中，多租户意味着可以使用多个 Keycloak 领域来保护单个目标应用程序 （WAR）。可以定位领域在同一个 Keycloak 实例或不同的实例上。

实际上，这意味着应用程序需要具有多个适配器配置`keycloak.json`
文件。

可以将多个 WAR 实例，并将不同的适配器配置文件部署到不同的上下文路径。但是，这可能不方便,可能还希望根据上下文路径以外的其他内容选择领域。

Keycloak 可以拥有自定义配置解析器，以便可以选择用于每个请求的适配器配置。

要首先实现这一点，需要创建一个实现。例如：`org.keycloak.adapters.KeycloakConfigResolver`

```java
package example;

import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.KeycloakDeploymentBuilder;

public class PathBasedKeycloakConfigResolver implements KeycloakConfigResolver {

    @Override
    public KeycloakDeployment resolve(OIDCHttpFacade.Request request) {
        if (path.startsWith("alternative")) {
            KeycloakDeployment deployment = cache.get(realm);
            if (null == deployment) {
                InputStream is = getClass().getResourceAsStream("/tenant1-keycloak.json");
                return KeycloakDeploymentBuilder.build(is);
            }
        } else {
            InputStream is = getClass().getResourceAsStream("/default-keycloak.json");
            return KeycloakDeploymentBuilder.build(is);
        }
    }

}
```
还需要配置`KeycloakConfigResolver`实现来使用`web.xml`中的`keycloak.config.resolver`上下文参数：

```XML
<web-app>
    ...
    <context-param>
        <param-name>keycloak.config.resolver</param-name>
        <param-value>example.PathBasedKeycloakConfigResolver</param-value>
    </context-param>
</web-app>
```

## 2.2. JavaScript 适配器

Keycloak带有一个客户端JavaScript库，可用于保护HTML5 / JavaScript应用程序。JavaScript 适配器内置了对 Cordova 应用程序的支持。

一个好的做法是使用 NPM 或 Yarn 等包管理器在应用程序中包含 JavaScript 适配器。 `keycloak-js`包在以下位置可用：

-	NPM：https://www.npmjs.com/package/keycloak-js

-	Yarn：https://yarnpkg.com/package/keycloak-js

或者，可以直接从位于`/js/keycloak.js`的 Keycloak 服务器检索库，也可以作为 ZIP 存档分发。

关于使用客户端应用程序需要注意的一件重要事情是客户端必须是公共客户端，因为没有安全的方法可以将客户端凭据存储在客户端应用程序中。这使得为客户端配置的重定向 URI 正确且具体非常重要。

要使用 JavaScript 适配器，必须首先在 Keycloak 管理控制台中为应用程序创建客户端。确保`Access Type`为`public`。可以通过关闭客户端身份验证开关在功能配置中实现此目的。
还需要配置`有效的重定向 URI`和`Web 源`。需要尽可能具体，否则可能会导致安全漏洞。

以下示例演示如何初始化 JavaScript 适配器：

```html
<html>
<head>
    <script src="keycloak.js"></script>
    <script>
        function initKeycloak() {
            const keycloak = new Keycloak();
            keycloak.init().then(function(authenticated) {
                alert(authenticated ? 'authenticated' : 'not authenticated');
            }).catch(function() {
                alert('failed to initialize');
            });
        }
    </script>
</head>
<body onload="initKeycloak()">
    <!-- your page content goes here -->
</body>
</html>
```

如果`keycloak.json`文件位于不同的位置，可以指定它：

```js
const keycloak = new 
Keycloak('http://localhost:8080/myapp/keycloak.json');
```

或者，可以传入具有所需配置的 JavaScript 对象：

```js
const keycloak = new Keycloak({
    url: 'http://keycloak-server$',
    realm: 'myrealm',
    clientId: 'myapp'
});
```

默认情况下，当进行身份验证时调用`login`函数。但是，有两个选项可用于使适配器自动进行身份验证。可以将`login-required`或`check-sso`传递给 init 函数。当包含`login-required`参数时，会验证用户是否登录到 Keycloak，否则将显示登录页面。`check-sso`将验证客户端上的用户登录状态，如果用户未登录，浏览器将被重定向回应用程序并保持未验证状态。

也可以配置silent`check-sso`选项。启用此功能后，浏览器不会完全重定向到 Keycloak 服务器并返回到应用程序，但此操作将在隐藏的`iframe`中执行，因此应用程序资源只需在初始化应用程序时由浏览器加载和解析一次，而在从 Keycloak 重定向回应用程序后无需再次加载和解析。这在`SPA（Single Page Applications）`的情况下特别有用。

要启用silent`check-sso`，必须在 init 方法中提供`silentCheckSsoRedirectUri`属性。 此 URI 必须是应用程序中的有效endpoint：

```js
keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
})
```

在成功检查身份验证状态并从 Keycloak 服务器检索令牌后，silent check-sso 重定向 URI的页面将加载到 iframe中。除了将收到的token发送到主应用程序之外，没有其他任务，并且应该看起来像这样：

```html
<html>
<body>
    <script>
        parent.postMessage(location.href, location.origin)
    </script>
</body>
</html>
```

请记住，指定位置的此页面必须由应用程序本身提供，而不是JavaScript 适配器的一部分！
>`Silent check-sso`功能在一些浏览器受限， 详情请查看浏览器反追踪章节。

要启用`login-required`，设置`onLoad`为`login-required`并传递给 init 方法：

```js
keycloak.init({
    onLoad: 'login-required'
})
```

用户通过身份验证后，应用程序可以通过在Authorization Header中包含 bearer token来向 Keycloak 保护的 RESTful 服务发出请求。 

例如： 

```js
const loadData = function () {
    document.getElementById('username').innerText = keycloak.subject;

    const url = 'http://localhost:8080/restful-service';

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                alert('Success');
            } else if (req.status == 403) {
                alert('Forbidden');
            }
        }
    }

    req.send();
};
```

要记住的一件事是默认情况下access token的有效期很短，因此可能需要在发送请求之前刷新access token。 可以通过`updateToken`方法执行此操作。`updateToken`方法返回一个 promise，这使得仅当token成功刷新时调用服务变得容易，如果没有刷新则向用户显示错误。 

例如：

```js
keycloak.updateToken(30).then(function() {
    loadData();
}).catch(function() {
    alert('Failed to refresh token');
});
```

### 2.2.1. Session Status iframe

默认情况下，JavaScript 适配器会创建一个隐藏的 iframe，用于检测是否发生了单点注销。 这不需要任何网络流量，而是通过查看特殊状态 cookie 来检索状态。 可以通过传递给init方法的选项中设置`checkLoginIframe`: `false`来禁用此功能。

不应依赖于直接查看此 cookie。 它的格式可以改变，并且它还与 Keycloak 服务器的 URL 相关联，而不是应用程序。

>Session Status受限于某些浏览器，请查[浏览器反追踪章节。

### 2.2.2. Implicit and Hybrid流

默认情况下，JavaScript 适配器使用授权码流。

通过此流程，Keycloak 服务器向应用程序返回授权码，而不是身份验证令牌。在浏览器重定向回应用程序后，JavaScript 适配器通过授权码交换access token和refresh token。
Keycloak 还支持Implicit流，在使用 Keycloak 成功进行身份验证后立即发送access token。这可能比标准授权码流具有更好的性能，但在access token过期时会产生影响。

但是，在 URL 片段中发送access token可能是一个安全漏洞。例如，令牌可能通过 Web 服务器日志或浏览器历史记录泄露。

要启用Implicit流，需要在 Keycloak 管理控制台中为客户端启用Implicit流启用标志。还需要将具有Implicit流的参数流传递给 init 方法：

```js
keycloak.init({
    flow: 'implicit'
})
```

需要注意的一点是，只提供了一个access token，没有refresh token牌。 这意味着一旦访问令牌过期，应用程序必须再次重定向到 Keycloak 以获得新的access token。

Keycloak 也支持Hybrid流。

这要求客户端在管理控制台中启用`Standard Flow Enabled`和`Implicit Flow Enabled`标志。 然后，Keycloak 服务器会将代码和令牌发送到应用程序。访问令牌可以立即使用，而授权码可以交换access token和refresh token。与Implicit流类似，混合流有利于性能，因为访问令牌立即可用。但是，令牌仍然在 URL 中发送，前面提到的安全漏洞可能仍然存在。

Hybrid流中的一个优点是refresh token可供应用程序使用。

对于Hybrid流，需要将值为hybrid的参数与值传递给init方法：

```js
keycloak.init({
    flow: 'hybrid'
})
```

### 2.2.3. 具有跟踪保护的现代浏览器

在某些浏览器的最新版本中，应用了各种cookie策略来防止第三方跟踪用户， 例如 Chrome 中的 SameSite 或完全阻止的第三方 Cookie。预计随着时间的推移，这些政策将变得更加严格并被其他浏览器采用，最终导致浏览器完全不支持和阻止第三方上下文中的 cookie。 受此影响的适配器功能将来可能会被弃用。

Javascript 适配器依赖于第三方 cookie 来获取会话状态 iframe、silen `check-sso` 以及部分常规（not-slient）check-sso。根据浏览器对 cookie 的限制程度，这些功能的功能有限或完全禁用。 适配器会尝试检测此设置并做出相应的反应。

#### 具有“SameSite=Lax”默认策略的浏览器

如果在 Keycloak 端和应用程序端配置了 SSL / TLS 连接，则支持所有功能。 例如，受影响的是从版本 84 开始的 Chrome。

#### 具有阻止的第三方 Cookie 的浏览器

会话状态 iframe 不受支持，如果 JS 适配器检测到此类浏览器行为，则会自动禁用 iframe。这意味着适配器不能使用会话 cookie 进行单点注销检测，而必须完全依赖令牌。这意味着当用户在另一个窗口中注销时，使用 JavaScript 适配器的应用程序在尝试刷新访问令牌之前不会被注销。因此，建议将 Access Token Lifespan 设置为相对较短的时间，以便尽早检测到注销。

silent `check-sso`不支持，默认情况下回退到常规（not-slient）`check-sso`。可以通过在传递给`init`方法的选项中设置`silentCheckSsoFallback`: `false`来更改此行为。 在这种情况下，如果检测到限制性浏览器行为，`check-sso`将被完全禁用。

常规的`check-sso`也会受到影响。由于不支持会话状态 iframe，因此在初始化适配器以检查用户的登录状态时，必须对 Keycloak 进行额外的重定向。这与使用 iframe 判断用户是否登录时的标准行为不同，并且仅在注销时执行重定向。

例如，受影响的浏览器是从 13.1 版开始的 Safari。

### 2.2.4. JavaScript 适配器参考

#### 构造函数

```js
new Keycloak();
new Keycloak('http://localhost/keycloak.json');
new Keycloak({ url: 'http://localhost', realm: 'myrealm', clientId: 'myApp' });
```

#### 配置

- authenticated

如果用户已通过身份验证，则为`true`，否则`false`。

- token

可以在对服务的请求中的`Authorization Header`中发送的base64编码Token。

- tokenParsed

作为 JavaScript 对象解析的Token。

- subject

用户标识。

- idToken

base64 编码的IDToken。

- idTokenParsed

作为 JavaScript 对象的解析ID Token。

- realmAccess

与令关联的realm角色。

- resourceAccess

与令牌关联的资源角色。

- refreshToken

可用于检索新令牌的 base64 编码refresh token。

- realmTokenParsed

作为 JavaScript 对象解析的refresh token。

- timeSkew

浏览器时间和 Keycloak 服务器之间的估计时间差，以秒为单位。该值只是一个估计值，但在确定令牌是否过期时足够准确。

- responseMode

在 init 中传递的响应模式
>默认值为fragment

- flow

在初始化中定义的流。

- adapter

允许覆盖库处理重定向和其他浏览器相关功能的方式

- 可用选项：
    - `default`<br/>
 库使用浏览器 API 进行重定向（这是默认值）
    - `cordova`<br/>
库将尝试使用 InAppBrowser cordova 插件加载 keycloak 登录/注册页面（当库在 cordova 生态系统中工作时会自动使用）
    - `Cordova-native`<br/>
     库尝试使用BrowserTabs cordova插件使用手机的系统浏览器打开登录和注册页面。这需要额外的设置才能重定向回应用程序。
    - `custom`<br/>
     允许实现自定义适配器（仅适用于高级用例）

- responseType

登录请求时发送到 Keycloak 定义的响应类型。这是根据init期间使用的flow值确定的，但可以通过设置此值来覆盖。

#### 方法

#### init(options)

>options, 初始化

调用以初始化适配器。

选项是一个对象，其中：

- useNonce 

添加一个加密随机数以验证身份验证响应是否与请求匹配。
>默认值为`true`

- onLoad 

指定在加载时要执行的操作。支持的值是`login-required`或`check-sso`。

- silentCheckSsoRedirectUri 

如果`onLoad`设置为`check-sso`，则为静默身份验证检查设置重定向 URI。

- silentCheckSsoFallback 

当浏览器不支持silent `check-sso`时启用回退到常规`check-sso`。
>默认值为`true`

- token 

设置Token的初始值。

- refreshToken 

设置refreshToken的初始值。

- idToken 

设置 idToken的初始值。
>仅与token或refreshRoken一起设置

- scope 

将默认范围参数设置为 Keycloak 登录端点。使用以空格分隔的范围列表。这些通常引用在特定客户端上定义的客户端范围。请注意，范围openid将始终由适配器添加到作用域列表中。例如，如果输入范围选项地址电话，那么对Keycloak的请求将包含范围参数`scope=openid`。>请注意，如果login()选项显式指定了范围，则会覆盖此处指定的默认范围。

- timeSkew 

以秒为单位设置本地时间和 Keycloak 服务器之间偏差的初始值。
>仅与token或refreshToken一起）

- checkLoginIframe 

设置启用/禁用监视登录状态。
> 默认值为true

- checkLoginIframeInterval

设置检查登录状态的间隔。
>默认值为 5 秒

- responseMode 

设置OpenID Connect响应模式在登录请求时发送到Keycloak服务器。有效值是`query`或`fragment`。
>默认值为fragment，这意味着在身份验证成功后，Keycloak将重定向到JavaScript应用程序，并在URL片段中添加OpenID Connect参数。这通常更安全，建议使用。

- flow 

设置 OpenID Connect流。有效值是`standard`、`implicit`或`hybrid`。

- enableLogging 

启用从 Keycloak 将消息记录到控制台。
>默认值为false

- pkceMethod<br/>
要使用的证明密钥代码交换(PKCE)方法。配置此值将启用PKCE机制。<br/>
可用选项：
    - `S256` - 基于 SHA256 的 PKCE 方法

- messageReceiveTimeout

 设置等待来自 Keycloak 服务器的消息响应的超时（以毫秒为单位）。例如，在第三方 cookie 检查期间等待消息时，会使用此功能。
 >默认值为 10000。


#### login(options)

>登录

重定向到登录表单。

选项是可选对象，其中：

- redirectUri 

指定登录后要重定向到的 URI。

- prompt 

此参数允许在 Keycloak 服务器端稍微自定义登录流程。 例如，在login值的情况下强制显示登录屏幕。

- maxAge 

仅在用户已通过身份验证时使用。指定自用户身份验证发生以来的最长时间。如果用户已通过身份验证的时间超过`maxAge`，则会忽略 SSO，并且需要再次重新进行身份验证。

- loginHint 

用于在登录表单上预先填写用户名/电子邮件字段。

- scope 

用于将 scope 参数转发到 Keycloak 登录端点。使用以空格分隔的范围列表。这些通常引用在特定客户端上定义的客户端范围。请注意，范围openid将始终由适配器添加到作用域列表中。例如，如果输入范围选项地址电话，则对Keycloak的请求将包含`cope=openid address phone`参数。

- idpHint 
用于告诉 Keycloak 跳过显示登录页面并自动重定向到指定的身份提供者。

- acr 

包含有关acr声明的信息，这些信息将在声明参数中发送到 Keycloak 服务器。典型用途是逐步验证。使用示例`{values: ["silver", "gold"], essential: true}`。

- action 

如果值是`register`，则用户被重定向到注册页面，如果值是`UPDATE_PASSWORD`，则用户将被重定向到重置密码页面（如果未通过身份验证，首先将用户发送到登录页面，并在身份验证后重定向），否则将重定向到登录页面。

- locale

设置`ui_locales 查询参数，详细参考OIDC1.0的[3.1.2.1](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest])

- ordovaOptions

指定传递给 Cordova 应用内浏览器的参数（如果适用）。选项`hidden`和`location`不受这些参数的影响。
>所有可选项定义在 https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/ 。例如使用`{ zoom: "no", hardwareback: "yes" `。


#### createLoginUrl(options)

> 创建登录网址

返回要登录表单的 URL。

选项是一个可选对象，它支持与函数login相同的选项。

#### logout(options)

> 登出

重定向到注销。

选项是一个对象，其中：

- redirectUri 

指定注销后要重定向到的 URI。

#### createLogoutUrl(options)

>创建登出url

返回用于注销用户的 URL。

选项是一个对象，其中：

- redirectUrl

指定注销后要重定向到的 URI。

#### register(options)

>注册

重定向至注册表。使用选项`action= 'register'`登录的快捷方式
选项与登录方法相同，但`action`设置为`register`

#### createRegisterUrl(options)

>创建注册url

将 url 返回到注册页面。 带有选项`action = 'register'`的`createLoginUrl`的快捷方式。

#### accountManagement()

重定向到帐户管理控制台。

#### createAccountUrl(options)

> 创建账户url

返回帐户管理控制台的 URL。

选项是一个对象，其中：

- redirectUri 

指定重定向回应用程序时要重定向到的 URI。

#### hasRealmRole(role)

>realm是否有角色

如果token具有给定的realm角色，则返回 `true`。

#### hasResourceRole(role,resource)

> 资源是否有角色

如果token具有资源的给定角色，则返回 `true`
> 资源是可选的，如果未指定，则使用 clientId。

#### loadUserProfile()

>加载用户配置文件

返回使用配置文件解析的约定。

例如：

```js
keycloak.loadUserProfile()
    .then(function(profile) {
        alert(JSON.stringify(profile, null, "  "))
    }).catch(function() {
        alert('Failed to load user profile');
    });
```

#### isTokenExpire(minValidity)

>token是否过期

如果Token在到期前剩余的时间少于 minValidity 秒，则返回`true`

minValidity 是可选的，如果未指定，则使用 0。

#### updateToken(minValidity)

>刷新token

如果Token在 minValidity 秒内过期（minValidity 是可选的，如果未指定，则默认值为5）刷新令牌。 

如果启用了会话状态 iframe，则还会检查会话状态。

返回一个用boolean解析的约定，该boolean指示令牌是否已被刷新。

例如：

```js
keycloak.updateToken(5)
    .then(function(refreshed) {
        if (refreshed) {
            alert('Token was successfully refreshed');
        } else {
            alert('Token is still valid');
        }
    }).catch(function() {
        alert('Failed to refresh the token, or the session has expired');
    });
```

#### clearToken（）

>清除token

清除身份验证状态，包括令牌。 如果应用程序检测到会话已过期，这可能很有用，例如更新令牌失败。
调用它会导致调用 onAuthLogout 回调侦听器。

#### 回调事件

适配器支持为某些事件设置回调监听器。请记住，这些必须在调用`init`函数之前设置。

例如：

```js
keycloak.onAuthSuccess = function() { alert('authenticated'); }
```

可用的事件包括：

- **onReady（authenticated）**- 初始化适配器时调用。
- **onAuthSuccess** - 在用户成功通过身份验证时调用。
- **onAuthError** - 如果在身份验证期间出现错误，则调用。
- **onAuthRefreshSuccess** - 刷新token时调用。
- **onAuthRefreshError** - 如果在尝试刷新token时出错，则调用。
- **onAuthLogout** - 如果用户注销时调用
    >仅当会话状态 iframe 已启用或处于 Cordova 模式时才会调用。
- **onTokenExpired** - 在access token过期时调用。如果刷新令牌可用，则可以使用 updateToken 刷新令牌，或者如在不可用的情况下（即使用隐式流），则可以重定向到登录页面以获取新的访问令牌。

## 2.3. Node.js适配器

Keycloak提供了一个构建在Connect之上的Node.js适配器，以保护服务器端JavaScript应用程序 - 目标是足够灵活，可以与[Express.js](https://expressjs.com/)等框架集成。

当前库可以直接从[npmjs包管理](https://www.npmjs.com/package/keycloak-connect)下载, 来源于[Gtihub](https://github.com/keycloak/keycloak-nodejs-connect)。

要使用 Node.js 适配器，首先必须在 Keycloak 管理控制台中为应用程序创建客户端。适配器支持`public`, `confidential`, and `bearer-only`访问类型。选择哪一个取决于用例场景。

客户端创建后选择`Installation`页,在`Format Option`中选择`Keycloak OIDC JSON`并下载。下载的`keycloak.json`文件应该放在项目的根目录。

### 2.3.1. 安装

假设已经安装了Node.js，首先在应用程序下创建一个文件夹：

```bash
mkdir myapp && cd myapp
```

使用`npm init`命令为应用程序创建一个`package.json`。 现在在依赖项列表中添加 Keycloak 连接适配器：

```json
    "dependencies": {
        "keycloak-connect": "20.0.0"
    }
```

### 2.3.2. 用法

#### 实例化 Keycloak 类

Keycloak类为应用程序配置提供了一个中心点。最简单的初始化不涉及任何配置。
在项目的根目录中，创建一个名为`server.js`的文件并添加以下代码：

```js
    const session = require('express-session');
    const Keycloak = require('keycloak-connect');

    const memoryStore = new session.MemoryStore();
    const keycloak = new Keycloak({ store: memoryStore });
```

安装`express-session`依赖项：

```bash
    npm install express-session
```

要启动`server.js`脚本，在`package.json`中添加加以下命令：

```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start" "node server.js"
    },
```

现在可以使用以下命令运行服务器：

```bash
    npm run start
```

默认情况下，这将在应用程序的主要可执行文件旁边找到一个名为`keycloak.json`的文件，在我们的例子中是在根文件夹中，以初始化特定于 keycloak 的设置，例如公钥、realm名、各种 URL。

在这种情况下，需要 Keycloak 部署才能访问 Keycloak 管理控制台。

现在我们准备通过访问 Keycloak 管理控制台 → 客户端（左侧边栏）→ 选择客户端→ Installation → Format Option → Keycloak OIDC JSON → 下载`keycloak.json`

将下载的文件粘贴到项目的根文件夹中。

使用此方法实例化会导致使用所有合理的默认值。 作为替代方案，也可以提供一个配置对象，而不是`keycloak.json`文件：

```json
    const kcConfig = {
        clientId: 'myclient',
        bearerOnly: true,
        serverUrl: 'http://localhost:8080',
        realm: 'myrealm',
        realmPublicKey: 'MIIBIjANB...'
    };

    const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
```

应用程序还可以使用以下方法将用户重定向到其首选标识提供者：

```json
    const keycloak = new Keycloak({ store: memoryStore, idpHint: myIdP }, kcConfig);
```

#### 配置 Web session存储

如果要使用Web会话来管理服务器端状态已进行身份验证，则需要使用至少一个存储参数初始化`Keycloak(…)`，并传入`express-session`正在使用的实际会话存储。

```json
    const session = require('express-session');
    const memoryStore = new session.MemoryStore();

    // Configure session
    app.use(
      session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );

    const keycloak = new Keycloak({ store: memoryStore });
```

#### 传递自定义范围值

默认情况下，scope `openid`作为查询参数传递给 Keycloak 的登录 URL，但可以添加额外的自定义值：

```js
    const keycloak = new Keycloak({ scope: 'offline_access' });
```

### 2.3.3. 安装中间件

实例化后，将中间件安装到支持连接的应用：

为此，首先我们必须安装 Express：

```bash
    npm install express
```

然后在我们的项目中引入Express，如下所述：

```js
    const express = require('express');
    const app = express();
```

并在 Express 中配置 Keycloak 中间件：

```js
    app.use( keycloak.middleware() );
```

最后，通过将以下代码添加到`main.js`来设置服务器以侦听端口 3000 上的 HTTP 请求：

```js
    app.listen(3000, function () {
        console.log('App listening on port 3000');
    });
```

### 2.3.4. 代理配置

如果应用程序在终止 SSL 连接的代理后面运行，则必须按照 [express behind 代理指南](https://expressjs.com/en/guide/behind-proxies.html)配置 Express。 使用不正确的代理配置可能会导致生成无效的重定向 URI。

配置示例：

```js
    const app = express();

    app.set( 'trust proxy', true );

    app.use( keycloak.middleware() );
```

### 2.3.5. 保护资源

#### Simple authentication

要强制用户在访问资源之前必须进行身份验证，只需使用`keycloak.protect()`无参数版本：

```js
    app.get( '/complain', keycloak.protect(), complaintHandler );
```

#### Role-based authorization

若要保护具有当前应用的应用程序角色的资源，请执行以下操作：

```js
    app.get( '/special', keycloak.protect('special'), specialHandler );
```

若要使用其他应用的应用程序角色保护资源，请执行以下操作：

```js
    app.get( '/extra-special', keycloak.protect('other-app:special'), extraSpecialHandler );
```

要保护具有realm角色的资源，请执行以下操作：

```js
    app.get( '/admin', keycloak.protect( 'realm:admin' ), adminHandler );
```

#### Resource-based authorization

基于资源的授权允许根据 Keycloak 中定义的一组策略保护资源及其特定方法/操作**，从而将应用程序的授权外部化。这是通过公开可用于保护资源的`keycloak.enforcer`方法来实现的。

```js
    app.get('/apis/me', keycloak.enforcer('user:profile'), userProfileHandler);
```

`keycloak-enforcer`方法以两种模式运行，具体取决于`response_mode`配置选项的值。

```js
    app.get('/apis/me', keycloak.enforcer('user:profile', {response_mode: 'token'}), userProfileHandler);
```

如果`response_mode`设置为`token`，则代表发送到应用程序的bearer token所代表的行为从服务器获取权限。在这种情况下，Keycloak 会使用服务器授予的权限发出一个新的访问令牌。 如果服务器没有使用具有预期权限的token进行响应，则请求被拒绝。使用此模式时，能够从请求中获取令牌，如下所示：

```js
    app.get('/apis/me', keycloak.enforcer('user:profile', {response_mode: 'token'}), function (req, res) {
        const token = req.kauth.grant.access_token.content;
        const permissions = token.authorization ? token.authorization.permissions : undefined;

        // show user profile
    });
```

当应用程序正在使用session并且希望缓存来自服务器的先前决策以及自动处理refresh token时，首选此模式。此模式对于充当客户端和资源服务器的应用程序特别有用。

如果`response_mode`设置为`permissions`（默认模式），服务器仅返回已授予权限的列表，而不颁发新的access token。除了不颁发新token外，此方法还通过请求公开服务器授予的权限：

```js
    app.get('/apis/me', keycloak.enforcer('user:profile', {response_mode: 'permissions'}), function (req, res) {
        const permissions = req.permissions;

        // show user profile
    });
```

无论使用哪种`response_mode`，`keycloak.enforce`方法都将首先尝试检查发送到应用程序的token中的权限。如果token已携带预期的权限，则无需与服务器交互以获取决策。当客户端能够在访问受保护的资源之前从具有预期权限的服务器获取access token时特别有用，因此可以使用 Keycloak 授权服务提供的某些功能（如增量授权），并避免在`keycloak.enforcer`强制访问资源时向服务器发出额外请求。

默认情况下，策略执行器将使用为应用程序定义的`client_id`（例如，通过`keycloak.json`）来引用 Keycloak 中支持 Keycloak 授权服务的客户端。 在这种情况下，客户端不能是public，因为它实际上是一个资源服务器。

如果应用程序同时充当公共客户端（前端）和资源服务器（后端），则可以使用以下配置在 Keycloak 中使用需要执行的策略：

```js
      keycloak.enforcer('user:profile', {resource_server_id: 'my-apiserver'})
```

建议在 Keycloak 中使用不同的客户端来表示前端和后端。

如果应用程序启用了 Keycloak 授权服务，并且在`keycloak.json`中定义了客户端凭据，则可以将其他claims推送到服务器并使它们可用于做出决策。为此，可以定义一个`claims`配置选项，该选项需要一个返回 JSON 的函数，其中包含需要推送的claims：

```js
      app.get('/protected/resource', keycloak.enforcer(['resource:view', 'resource:write'], {
          claims: function(request) {
            return {
              "http.uri": ["/protected/resource"],
              "user.agent": // get user agent  from request
            }
          }
        }), function (req, res) {
          // access granted
```

更多保护应用资源的Keycloak配置相关信息,请参考[《认证服务指南》](https://www.keycloak.org/docs/latest/authorization_services/)

#### Advanced authrization

根据 URL 本身的某些部分保护资源，假设每个部分都存在一个角色：

```js
    function protectBySection(token, request) {
      return token.hasRole( request.params.section );
    }

    app.get( '/:section/:page', keycloak.protect( protectBySection ), sectionHandler );
```

#### 额外登录配置:

默认情况下，所有未经授权的请求都将被重定向到 Keycloak 登录页面，除非客户端是不记名的。但是，confidential或public客户端可能同时托管浏览器和 API 端点。要防止对未经身份验证的 API 请求进行重定向并返回 HTTP 401，可以重写 redirectToLogin 函数。

例如，该重写检查 URL 是否包含 /api/ 并禁用登录重定向：

```js
    Keycloak.prototype.redirectToLogin = function(req) {
    const apiReqMatcher = /\/api\//i;
    return !apiReqMatcher.test(req.originalUrl || req.url);
    };
```

### 2.3.6. 其它URLs

#### 显式用户触发注销

默认情况下，中间件会捕获对`/logout`的调用，并通过以Keycloak为中心的注销工作流程进行操作。这可以通过为`middleware()`调用指定注销配置参数来更改：

```js
    app.use( keycloak.middleware( { logout: '/logoff' } ));
```

当用户触发注销时，可以传递查询参数redirect_url：

```js
https://example.com/logoff?redirect_url=https%3A%2F%2Fexample.com%3A3000%2Flogged%2Fout
```

然后将该参数用作 OIDC 注销端点的重定向 url，用户将被重定向到`https://example.com/logged/out`。

#### Keycloak管理员回调

此外，中间件支持从 Keycloak 控制台回调以注销单个会话或所有会话。默认情况下，这些类型的回调是相对于/的根 URL发生，但可以通过向`middleware()`调用提供管理参数来更改：

```js
app.use( keycloak.middleware( { admin: '/callbacks' } );

```

## 2.4. 其他 OpenID 连接

Keycloak可以通过适配器来帮助应用适配接入登录认证，并提供与Keycloak更好的集成。当上面适配器不适用于编程语言、框架或平台，则可以选择改用通用 OpenID 连接Relying Party (RP)库来适配接入。有关更多信息，请参阅[OpenID Connect规范](https://openid.net/connect/)和[OAuth2](https://datatracker.ietf.org/doc/html/rfc6749)规范。

### 2.4.1. Endpoints

最重要的endpoints是去理解配置`well-known endpoints`。其列出了Keycloak中与OpenID 连接实现相关的endpoint和其他配置选项。

该endpoint地址为：
`/realms/{realm-name}/.well-known/openid-configuration`

> 要获得完整的 URL，请添加 Keycloak 的URL，并替换{realm-name}为需要的realm名称。例如：
http://localhost:8080/realms/master/.well-known/openid-configuration

某些 RP 库从此终结点检索所有必需的endpoint，但对于其他库，可能需要单独列出endpoint。

#### Authorization endpoint

`/realms/{realm-name}/protocol/openid-connect/auth`

授权endpoint通过将用户代理重定向到此端点，执行最终用户的身份验证。

有关更多详细信息，请参阅 OpenID 连接规范中的[授权端点部分](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)。

#### Token endpoint

`/realms/{realm-name}/protocol/openid-connect/token`

Token endpoint用于获取Token。可以通过交换授权码或直接提供凭据来获取Token，具体取决于所使用的Open ID flow。Token endpoint也用于当token过期时获取新的access token。

有关更多详细信息，请参阅 OpenID Connect 规范中的[Token Endpoint部分](https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint)。

#### Userinfo endpoint

`/realms/{realm-name}/protocol/openid-connect/userinfo`

Userinfo endpoint返回有关身份验证后用户的标准声明，并受bearer token保护。

有关更多详细信息，请参阅 OpenID Connect 规范中的[Userinfo Endpoint部分](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)。

#### Logout endpoint

`/realms/{realm-name}/protocol/openid-connect/logout`

Logout endpoint注销经过身份验证的用户。
可以将用户代理重定向到endpoint，在这种情况下，活动用户session将注销。之后，用户代理被重定向回应用程序。
应用程序也可以直接调用logout endpoint,若要直接调用此endpoint，需要包含refresh token以及对客户端进行身份验证所需的凭据。

#### Certificate endpoint

`/realms/{realm-name}/protocol/openid-connect/certs`

Certificate endpoint返回realm启用的公钥，编码为 JSON Web Key（JWK）。根据realm设置，可以启用一个或多个密钥来验证Token。

有关详细信息，请参阅[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)和[JSON Web Key规范](https://datatracker.ietf.org/doc/html/rfc7517)。

#### Introspection endpoint

`/realms/{realm-name}/protocol/openid-connect/token/introspect`

Introspection endpoint用于检索token的活动状态。换句话说，可以使用它来验证access token 或 refresh token，它只能由可信客户端调用。

有关如何在此endpoint上调用的更多详细信息，请参阅[OAuth 2.0 Token Introspection规范](https://datatracker.ietf.org/doc/html/rfc7662)。

#### Dynamic Client Registration endpoint

`/realms/{realm-name}/clients-registrations/openid-connect`

Dynamic Client Registration endpoint用于动态注册客户端。

有关更多详细信息，请参阅客户端注册章节和[OpenID Connect 动态客户端注册规范](https://openid.net/specs/openid-connect-registration-1_0.html)。

#### Token Revocation endpoint

`/realms/{realm-name}/protocol/openid-connect/revoke`

Token Revocation endpoint用于吊销token。此终结点同时支持refresh tokens 和 access tokens。吊销refresh token时，也会撤销相应客户端的user consent。

有关如何在此endpoint上调用的更多详细信息，请参阅[OAuth 2.0 Token吊销规范](https://datatracker.ietf.org/doc/html/rfc7009)。

#### Device Authorization endpoint

`/realms/{realm-name}/protocol/openid-connect/auth/device`

Device Authorization endpoint用于获取设备代码和用户代码。它可以由可信或公共客户端调用。

有关如何在此endpoint上调用的更多详细信息，请参阅[OAuth 2.0 设备授权规范](https://datatracker.ietf.org/doc/html/rfc8628)。

#### Backchannel Authentication endpoint

`/realms/{realm-name}/protocol/openid-connect/ext/ciba/auth`

Backchannel Authentication endpoint用于获取标识客户端发出的身份验证请求的auth_req_id。它只能由可信客户端调用。

有关如何在此端点上调用的更多详细信息，请参阅[OpenID Connect 客户端初始后端身份验证流规范](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)。

另请参阅 Keycloak 文档的其他位置，例如本指南的客户端启动Backchannel身份验证授权部分和服务器管理指南的[客户端启动的Backchannel身份验证授权部分](https://www.keycloak.org/docs/latest/securing_apps/index.html#_client_initiated_backchannel_authentication_grant)。

### 2.4.2. 验证access tokens

如果需要手动验证 Keycloak 颁发的access tokens，可以调用Introspection Endpoint。 这种方法的缺点是必须对Keycloak服务器进行网络调用。如果同时进行太多验证请求，这可能很慢，并且可能使服务器服务瘫痪。

Keycloak 颁发的access tokens是使用 JSON Web Signature（JWS） 进行数字签名和编码的JSON Web Token （JWT）。 由于它们以这种方式编码，因此可以使用颁发realm的公钥在本地验证access tokens。可以硬编码realm公钥到验证access tokens代码，或者使用嵌入了Key ID （KID） 的JWS通过certificate endpoint查找和缓存公钥。根据编码语言，有许多第三方库可以帮助进行 JWS 验证。

### 2.4.3.  Flows 认证流

#### Authorization code 授权码

授权码流将用户代理重定向到 Keycloak。一旦用户成功通过Keycloak身份验证，则创建授权码，并将用户代理重定向回应用程序。然后，应用程序使用授权码及其credentials以从 Keycloak 获取访Access Token, Refresh Token 和 ID Token。

该流面向 Web 应用程序，但也建议用于原生应用程序，包括可以嵌入用户代理的移动应用程序。

有关更多详细信息，请参阅 OpenID Connect 规范中的[授权码流](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)。

#### Implicit隐式

隐式流重定向的工作方式与授权代码流类似，但Access Token和 ID Token不是通过返回授权码获取，而是直接返回。这减少了将授权码交换为Access Token或ID Token的额外调用，但它不包括Refresh Token。这导致需要允许过期时间较长的Access Token，但这样会导致很难使这些Token无效。或初始Access Token过期后，需要新的重定向才能获取新的Access Token。

如果应用程序只想对用户进行身份验证并处理注销本身，还有一个Hybrid flow混合流，其中返回Access Token和Authorization code授权码。

需注意，隐式流和混合流都有潜在的安全风险，因为Access Token可能会通过 Web 服务器日志和浏览器历史记录泄露。通过对Access Token使用较短过期时间，可以在一定程度上缓解此问题。

有关更多详细信息，请参阅 OpenID Connect 规范中的[隐式流](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth)。

#### Resource Owner Password Credentials 资源所有者密码凭据

资源所有者密码凭据（在 Keycloak 中称为直接授予）允许将用户凭据交换Access Token。不推荐使用此流，除非在只支持该流模式的旧版应用程序和命令行界面。

使用此流存在许多限制，包括：

-	向应用程序公开用户凭据
-	应用程序需要登录页面
-	应用程序需要了解身份验证方案
-	对身份验证流的更改需要对应用程序进行更改
-	不支持身份代理或社交登录
-	不支持流（用户自注册、用户必需操作等）
要允许客户端使用资源所有者密码凭据，客户端必须启用该选项：

Direct Access Grants Enabled
此流程不包含在 OpenID Connect 中，但它是 OAuth 2.0 规范的一部分。
有关更多详细信息，请参阅 OAuth 2.0 规范中的[资源所有者密码凭据授予一章](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3)。

示例：

使用 CURL 
以下示例演示如何在 realm master 使用用户名和密码中获取用户的Access Token。

该示例正在使用可信客户端： `myclient`

```bash
curl \
  -d "client_id=myclient" \
  -d "client_secret=40cc097b-2a57-4c17-b36a-8fdf3fc2d578" \
  -d "username=user" \
  -d "password=password" \
  -d "grant_type=password" \
  "http://localhost:8080/realms/master/protocol/openid-connect/token"
```

#### Client credentials 客户端凭据

当客户端（应用程序和服务）希望代表自己而不是代表用户获取访问权限时，将使用客户端凭据。例如不是特定用户，而需要修改通用系统配置的后台服务。

Keycloak 支持客户端使用密钥或公钥/私钥进行身份验证。

此流程不包含在 OpenID Connect 中，但它是 OAuth 2.0 规范的一部分。

有关更多详细信息，请参阅 OAuth 2.0 规范中的[客户端凭据授予一章](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)。

#### Device Authorization Grant 设备授权

设备授权授予由在输入功能有限或缺少合适浏览器的互联网连接设备上运行的客户端使用。 应用程序请求 Keycloak 设备代码和用户代码，Keycloak 创建设备代码和用户代码， 向应用程序返回包含设备代码和用户代码的响应。 然后，应用程序为用户提供用户代码和验证 URI。用户访问验证 URI 以使用其他浏览器进行身份验证。 应用程序反复轮询 Keycloak，直到 Keycloak 完成用户授权。 如果用户身份验证完成，应用程序将获取设备代码。然后，应用程序使用设备代码及其凭据从 Keycloak 获取`Access Token`、`Refresh Token`和 `ID Token`。

有关更多详细信息，请参阅[OAuth 2.0 设备授权规范](https://datatracker.ietf.org/doc/html/rfc8628)。

#### Client Initiated Backchannel Authentication Grant 客户端初始后台身份验证授权

客户端初始后台身份验证授予由希望通过直接与 OpenID 提供程序通信来启动身份验证流的客户端使用，而无需像 OAuth 2.0 的授权代码授予那样通过用户的浏览器重定向。


客户端向 Keycloak 请求一个`auth_req_id`，用于标识客户端发出的身份验证请求。Keycloak 创建`auth_req_id`。
收到此`auth_req_id`后，此客户端需要反复轮询 Keycloak 以从 Keycloak 获取`Access Token`、`Refresh Token`和 `ID Token`，以换取`auth_req_id`，直到用户通过身份验证。

如果客户端使用模式，则也可不需要重复轮询`Token endpoint`，而是等待 Keycloak 发送到指定的客户端通知到通知Endpoint。 

客户端通知Endpoint可以在 Keycloak 管理控制台中进行配置。CIBA 规范中介绍了客户端通知终结点协定的详细信息。

有关更多详细信息，请参阅[OpenID Connect 客户端初始后端身份验证流规范](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)。

另请参阅 Keycloak 文档的其他位置，例如本指南的后台身份验证Endpoint和服务器管理指南的客户端初始后端身份验证授权部分。

 有关 FAPI CIBA 合规性的详细信息，请参阅本指南的 FAPI 部分。

### 2.4.4. 重定向 URI

使用基于重定向的流时，请务必为客户端使用有效的重定向 URI。重定向 uri 应尽可能具体。这 尤其适用于客户端（公共客户端）应用程序。否则可能会导致：

-	开放重定向 - 这可能允许攻击者创建看似来自您的域的欺骗链接
-	未经授权的进入 - 当用户已使用 Keycloak 进行身份验证时，攻击者可以使用未正确配置重定向 URI 的公共客户端，通过在用户不知情的情况下重定向用户来获取访问权限

>在 Web 应用程序的生产环境中，始终使用https作为重定向 URI，不允许重定向到 http。

还有一些特殊的重定向 URI：

- http://localhost

此重定向 URI 对于本机应用程序非常有用，并允许本机应用程序在任何端口上创建可用于获取授权代码。

此重定向 uri 允许任何端口

- urn:ietf:wg:oauth:2.0:oob

如果无法在客户端中启动 Web 服务器（或浏览器不可用），则可以使用此特殊重定向 URI。 使用此重定向 uri 时，Keycloak 会显示一个页面，标题和页面上的框中包含代码。 应用程序可以检测到浏览器标题已更改，或者用户可以手动将代码复制粘贴到应用程序中。 

使用此重定向 uri，用户还可以使用其他设备粘贴代码复制到应用程序。

## 2.5. 金融级 API （FAPI） 支持

Keycloak 使管理员更容易确保其客户端符合以下规范：

- 金融级 API 安全配置文件 1.0 - 第 1 部分：[基线BaseLine](https://openid.net/specs/openid-financial-api-part-1-1_0.html)
- 金融级 API 安全配置文件 1.0 - 第 2 部分：[高级Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html)
- 金融级 API：[客户端初始后端身份验证配置文件 （FAPI CIBA)](https://openid.net/specs/openid-financial-api-ciba-ID1.html)

这种合规性意味着Keycloak服务将按照上述规范验证授权服务器是否满足要求。Keycloak 适配器对 FAPI 没有任何特定支持，因此需要在客户端应用上进行验证可能仍需要手动或通过其他一些第三方解决方案来完成安全加固。

### 2.5.1. FAPI 客户端配置文件

要确保客户端符合 FAPI规格，可以按照[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/#_client_policies)中所述在realm中配置客户端策略，并将它们链接到全局客户端配置文件以获得 FAPI 支持，这些配置文件在每个realm中自动可用。可以自由选择`fapi-1-baseline`或`fapi-1-advanced`任一配置文件或者基于FAPI配置自定义配置文件用于特定客户端。

如果想使用[推送授权请求 （PAR）](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients)，建议客户端在PAR 请求时，同时使用`fapi-1-baseline`和 `fapi-1-advanced `配置文件。具体来说，`fapi-1-base`配置文件包含`linepkce-enforcer`执行器，这确保了该客户端使用带有安全 S256 算法的 PKCE。除非 FAPI Advanced clients使用 PAR 请求，否则不需要这样做。

如果要以符合 FAPI 的方式使用CIBA，请确保客户端同时使用`fapi-1-advanced`和`fapi-ciba`两种和客户端配置文件。 需要使用`fapi-1-advanced `配置文件或包含所请求执行程序的其他客户端配置文件，因为`fapi-ciba`配置文件仅包含特定于 CIBA 的执行程序。 在强制执行 FAPI 、CIBA 规范时，需要更多要求，例如强制实施可信客户端或证书绑定访问Token。

### 2.5.2. 开放银行巴西金融级 API 安全配置文件

Keycloak 符合[巴西开放银行金融级 API 安全配置文件 1.0 实施草案 2](https://openbanking-brasil.github.io/specs-seguranca/open-banking-brasil-dynamic-client-registration-1_ID2-ptbr.html)。 

此规范在某些要求中比FAPI 1 高级规范更严格，因此可能需要以更严格的方式配置客户端策略以加固某些安全要求。

特别是：

- 如果客户端不使用推送授权请求（PAR），请确保使用加密的 OIDC 请求对象。这可以通过使用启用`secure-request-object`和`Encryption Required`执行程序的客户端配置文件来实现。
- 确保对于 `JWS`、`JWE`，客户端使用算法。可能需要在这些算法适用的所有客户端设置中设置`PS256`、 `RSA-OAEP`、 `A256GCM`。

### 2.5.3. TLS 注意事项

在交换机密信息时，所有交互都应使用 TLS （HTTPS） 进行加密。此外，FAPI规范中对使用的加密套件（cipher suites）和 TLS 协议版本，可以通过设置`https-protocols`和`https-cipher-suites`配置对应的加密套件。

Keycloak默认使用`TLSv1.3`方式安全加固，因此可能不需要更改默认设置。

然而如果由于某种原因需要回退到较低的 TLS 版本，则可能需要调整加密套件。

有关更多详细信息，请参阅[配置TLS指南](https://www.keycloak.org/server/enabletls)。 

# 3. 使用 SAML 保护应用程序和服务


本节介绍如何使用 Keycloak 客户端适配器或通用SAML provider libraries通过 SAML协议来保护应用程序和服务。

## 3.1. Java 适配器

Keycloak为Java应用程序提供了一系列不同的适配器。选择正确的适配器取决于目标平台。

### 3.1.1. 常规适配器配置

Keycloak 支持的每个 SAML 客户端适配器都可以通过简单的 XML 文本文件进行配置。 

例如：

```xml
<keycloak-saml-adapter xmlns="urn:keycloak:saml:adapter"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xsi:schemaLocation="urn:keycloak:saml:adapter https://www.keycloak.org/schema/keycloak_saml_adapter_1_10.xsd">
    <SP entityID="http://localhost:8081/sales-post-sig/"
        sslPolicy="EXTERNAL"
        nameIDPolicyFormat="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
        logoutPage="/logout.jsp"
        forceAuthentication="false"
        isPassive="false"
        turnOffChangeSessionIdOnLogin="false"
        autodetectBearerOnly="false">
        <Keys>
            <Key signing="true" >
                <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
                    <PrivateKey alias="http://localhost:8080/sales-post-sig/" password="test123"/>
                    <Certificate alias="http://localhost:8080/sales-post-sig/"/>
                </KeyStore>
            </Key>
        </Keys>
        <PrincipalNameMapping policy="FROM_NAME_ID"/>
        <RoleIdentifiers>
            <Attribute name="Role"/>
        </RoleIdentifiers>
        <RoleMappingsProvider id="properties-based-role-mapper">
            <Property name="properties.resource.location" value="/WEB-INF/role-mappings.properties"/>
        </RoleMappingsProvider>
        <IDP entityID="idp"
             signaturesRequired="true">
        <SingleSignOnService requestBinding="POST"
                             bindingUrl="http://localhost:8081/realms/demo/protocol/saml"
                    />

            <SingleLogoutService
                    requestBinding="POST"
                    responseBinding="POST"
                    postBindingUrl="http://localhost:8081/realms/demo/protocol/saml"
                    redirectBindingUrl="http://localhost:8081/realms/demo/protocol/saml"
                    />
            <Keys>
                <Key signing="true">
                    <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
                        <Certificate alias="demo"/>
                    </KeyStore>
                </Key>
            </Keys>
        </IDP>
     </SP>
</keycloak-saml-adapter>
```

其中一些配置开关可能是特定于适配器的，有些在所有适配器中是通用的。

对于 Java 适配器，可以使用${…}格式作为系统属性替换,例如`${…}${jboss.server.config.dir}`

#### SP element SP 元素

以下是 SP 元素属性的说明：

```xml
<SP entityID="sp"
    sslPolicy="ssl"
    nameIDPolicyFormat="format"
    forceAuthentication="true"
    isPassive="false"
    keepDOMAssertion="true"
    autodetectBearerOnly="false">
...
</SP>
```

#### entity ID

>实体ID

这是此客户端的标识符。 IdP 需要此值来确定与其通信的客户端。
> 此属性是必需的。

#### sslPolicy 

>ssl配置

这是适配器将强制执行的 SSL 策略。 有效值为：`ALL`, `EXTERNAL` 和 `NONE`。

对于 `ALL`，所有请求都必须通过HTTPS传入。 

对于 `EXTERNAL`，只有非私有 IP 地址必须通过 HTTPS 通过网络传输。 

对于 `NONE`，不需要通过HTTPS发送任何请求。

> 此属性是可选的。默认值为EXTERNAL

#### nameIDPolicyFormat

>nameID格式

SAML 客户端可以请求特定的 NameID 对象格式。 如果需要特定格式，请填写此值。 必须是标准的 SAML 格式标识符：
urn:oasis:names:tc:SAML:2.0:nameid-format:transient 
> 此属性是可选的。 默认情况下，不请求特殊格式。

#### forceAuthentication

>每次认证

SAML 客户端可以请求重新验证用户，即使用户已在 IdP 上登录。 设置`true`此项以启用。
> 此设置是可选的。 默认值为。`false`


#### isPassive

> 是否激活

SAML 客户端可以请求从不要求用户进行身份验证，即使用户未在 IdP登录也是如此。 
如果需要设置`true`此项以启用，请勿将此项设置与`forceAuthentication`一起使用，因为它们设置相反。
> 此设置是可选的。 默认值为`false`

#### turnOffChangeSessionIdOnLogin

>关闭登录改变session ID

默认情况下，在某些平台上成功登录时会更改`session  ID`，以阻止安全攻击媒介。 
更改此以`true`禁用此功能，建议不要将其关闭。
> 默认值为`false`

#### autodetectBearerOnly

>自动检测持有者

如果应用程序同时提供 Web 应用程序和 Web 服务（例如 SOAP 或 REST），则应将其设置为`true`。 此时允许将 Web 应用程序的未经身份验证的用户重定向到 Keycloak 登录页面， 同时将 `HTTP 401`状态码发送到未经身份验证的 SOAP 或 REST 客户端当其无法重定向到登录页面。 

Keycloak 根据典型的标头`X-Requested-With`, `SOAPAction`或者`Accept`自动检测 SOAP 或 REST 客户端。 

>默认值为`false`

#### logoutPage

>登出页

将某页面设置为在注销后显示。如果网页是完整的网址，例如`http://web.example.com/logout.html`， 用户注销后使用 `HTTP 302 status`状态码重定向到该页面。

如果链接的scheme部分未被指定， 例如 `/logout.jsp`，页面在注销后显示，无论它是否位于Web.xml 中的security-constraint安全约束声明的保护地址，并且页面相对于部署上下文根进行解析。

#### keepDOMAssertion

> 保持Dom断言

此属性应设置为`true`，以使适配器存储`DOM representation`与`SamlPrincipal`中请求关联的原始表单。这个断言文档可以使用principal原则内的`getAssertionDocument`方法检索，这在重放已签名断言时特别有效，返回的文档是解析 Keycloak 服务器收到的 SAML 响应时生成的文档。 

> 此设置是可选的，其默认值为`false`（文档未保存在主体中）。

#### Service Provider keys and key elements

> 服务提供商密钥和密钥元素

如果 IdP 要求客户端应用程序（或 SP）对其所有请求进行签名，或者IdP加密断言，则必须定义用于执行此操作的密钥。对于客户端签名的文档，必须定义用于对文档进行签名的私钥和公钥或证书。 对于加密，只需定义用于解密它的私钥。

有两种方法可以描述密钥。 它们可以存储在`Java KeyStore`中，也可以直接在`keycloak-saml.xml`以 `PEM` 格式复制/粘贴密钥。

```xml
        <Keys>
            <Key signing="true" >
               ...
            </Key>
        </Keys>
```

Key元素有两个可选属性`signing`和`encryption`。 设置为 true 时，将配置适配器当前密钥的用途。 如果这两个属性都设置为 true，则密钥将用于对文档进行签名和解密加密断言。 属性其中之一必须设置为 true。

#### KeyStore element

>密钥存储元素

在该属性中，可以从 Java 密钥库加载密钥和证书。在`KeyKeyStore`属性声明。

```xml
        <Keys>
            <Key signing="true" >
                <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
                    <PrivateKey alias="myPrivate" password="test123"/>
                    <Certificate alias="myCertAlias"/>
                </KeyStore>
            </Key>
        </Keys>
```

上面是使用`KeyStore`属性定义的XML 配置属性

#### file

>文件

密钥存储的文件路径。
>此选项是可选的。必须设置文件或资源属性。

#### resource

>资源

密钥存储的`WAR`资源路径。 这是在方法调用`ServletContext.getResourceAsStream（）`时使用的路径。
此选项是可选的。必须设置文件或资源属性。

#### password

>密码

密钥库的密码。
> 此选项是必需的。

如果要定义 SP 将用于对文档进行签名的密钥，则还必须指定对私钥的引用 和 Java KeyStore密钥库中的证书。 上面示例中的PrivateKey和Certificate定义alias指向密钥库中的密钥或证书。密钥库需要额外的密码才能访问私钥，在PrivateKey属性中，必须使用password在属性中定义密码。

#### Key PEMS

>密钥Pems

在Key属性中，可以使用子元素直接声明密钥和证书，且这些元素中包含的值必须在`PrivateKeyPem`, `PublicKeyPem`,  `CertificatePem`子集中 ，这些值需使用`PEM`密钥格式。 如果使用`openssl`或类似的命令行工具生成密钥，则通常使用此

```xml
<Keys>
   <Key signing="true">
      <PrivateKeyPem>
         2341251234AB31234==231BB998311222423522334
      </PrivateKeyPem>
      <CertificatePem>
         211111341251234AB31234==231BB998311222423522334
      </CertificatePem>
   </Key>
</Keys>
```

#### SP PrincipalNameMapping element

> SP名字匹配策略元素

>此属性是可选的。 当创建`HttpServletRequest.getUserPrincipal()`等方法获取的 Java 主体对象时，可以使用`Principal.getName()`方法返回名称定义。

```xml
<SP ...>
  <PrincipalNameMapping policy="FROM_NAME_ID"/>
</SP>

<SP ...>
  <PrincipalNameMapping policy="FROM_ATTRIBUTE" attribute="email" />
</SP>
```
`policy`属性定义用于填充此值的策略。 
此属性的可能值为：

- FROM_NAME_ID

>此策略使用 SAML subject值<br/>
这是默认设置

- FROM_ATTRIBUTE

这将从服务器收到的 SAML 断言中声明的属性之一中提取值。 

需要指定要在 attribute XML 属性中使用的 SAML 断言属性的名称。

- RoleIdentifiers element

该属性定义应使用从用户收到的断言中的 SAML 属性，作为用户 Jakarta EE 安全上下文中的角色标识符。

```xml
<RoleIdentifiers>
     <Attribute name="Role"/>
     <Attribute name="member"/>
     <Attribute name="memberOf"/>
</RoleIdentifiers>
```

默认情况下，Role属性值将转换为 `Jakarta EE`角色。 某些 IdP 使用`member`或者`memberOf`属性断言发送角色。 可以定义一个或多个Attribute属性来指定必须将哪些 SAML 属性转换为角色。

#### RoleMappingsProvider element

> 角色映射Provider元素

RoleMappingsProvider是一个可选属性，允许指定 SAML 适配器要使用的特定`org.keycloak.adapters.saml.RoleMappingsProvider`SPI 实现的 ID 配置。

当 Keycloak 用作 IDP 时，可以使用内置的角色映射器来映射任何角色，然后再将它们添加到 SAML 断言。但是，当SAML 适配器可用于向第三方 IDP 发送 SAML 请求时，可能需要将从断言中提取的角色映射到 SP 所需的一组不同的角色。`RoleMappingsProvider`SPI允许配置可用于执行必要操作的可插拔角色映射。

提供程序的配置如下所示：

```xml
...
<RoleIdentifiers>
    ...
</RoleIdentifiers>
<RoleMappingsProvider id="properties-based-role-mapper">
    <Property name="properties.resource.location" value="/WEB-INF/role-mappings.properties"/>
</RoleMappingsProvider>
<IDP>
    ...
</IDP>
```

id属性标识要使用哪个已安装的`provider`。`Property`子属性可以多次使用以指定提供程序的配置属性。

- 基于属性的角色映射提供程序

Keycloak 包括`RoleMappingsProvider`使用`properties`文件实现角色映射的。该 `provider`由 `ID` 标识，并由`org.keycloak.adapters.saml.PropertiesBasedRoleMapper`类实现。

此`provider`依赖于两个可用于指定将被使用的`properties`文件位置的配置属性。首先，检查`properties.file.location`是否已指定属性，使用已配置的`properties`值以在文件系统中查找文件。如果未找到配置文件， `provider`将引发`RuntimeException`。

以下代码片段展现了`provider`使用`properties.file.configuration`选项从文件系统中的`/opt/mappers/`目录加载`roles`.

properties文件的示例：

```xml
    <RoleMappingsProvider id="properties-based-role-mapper">
        <Property name="properties.file.location" value="/opt/mappers/roles.properties"/>
    </RoleMappingsProvider>
```

如果`properties.file.location`尚未配置， `provider`将使用`properties.resource.location`配置的值从`WAR`源加载`properties`文件来检查属性。如果此配置属性也不存在， `provider`尝试从默认`/WEB-INF/role-mappings.properties`中加载文件。无法从资源中加载文件将导致`provider`抛出`RuntimeException`。以下代码片段展现了`provider`使用`properties.resource.location`从应用程序的`/WEB-INF/conf/`目录加载`roles.properties`文件：

```xml
    <RoleMappingsProvider id="properties-based-role-mapper">
        <Property name="properties.resource.location" value="/WEB-INF/conf/roles.properties"/>
    </RoleMappingsProvider>
```

该文件可以包含角色和主体作为键，以及以逗号分隔的零个或多个角色的列表 作为值。调用时，将迭代从断言中提取的角色集并检查， 对于每个角色，如果存在映射。如果角色映射到空角色，则会丢弃该角色。如果它映射到一组或不同的角色，那么这些角色将在结果集中设置。如果未找到该角色的映射，则它将按原样包含在结果集中。

处理角色后，该实现将检查从断言中提取的主体是否包含入口`properties`文件。如果主体的映射存在，则作为值列出的任何角色都将添加到结果集中。这 允许向主体分配额外的角色。

例如，假设提供程序已配置了以下属性文件：

```
roleA=roleX,roleY
roleB=

kc_user=roleZ
```

如果主体`kc_user`是从带有角色`roleA`, `roleB` 和 `roleC`的断言中提取的，并且，则最终分配的角色集合将是`roleC`, `roleX`, `roleY` 和 `roleZ`。

因为roleA同时被映射到`roleX`和`roleY`两者，`roleB`被映射到一个空角色 - 因此被丢弃，`roleC`按原样使用，最后是根据`kc_user`原则分配一个额外的角色`roleZ`。

> 注： 要在角色名称中使用空格进行映射，请使用 Unicode 替换空格。例如，传入的“角色 A”将显示为：
role\u0020A=roleX,roleY

- 添加自定义角色映射provider

要添加自定义角色映射提供程序，只需实现`org.keycloak.adapters.saml.RoleMappingsProvider`SPI。 
有关更多详细信息，请参阅《服务器开发人员指南》中的[SAML Role Mappings SPI](https://www.keycloak.org/docs/latest/server_development/)部分。

#### IDP Element

IDP 元素中的所有内容都描述了 与SP 通信的身份provider（身份验证服务器）的设置。

```xml
<IDP entityID="idp"
     signaturesRequired="true"
     signatureAlgorithm="RSA_SHA1"
     signatureCanonicalizationMethod="http://www.w3.org/2001/10/xml-exc-c14n#">
...
</IDP>
```

以下是可以在该属性声明中指定的属性配置选项:

- entityID

这是 IDP 的颁发者 ID。
>此设置是必需的。

- signaturesRequired

如果设置为`true`，客户端适配器将对其发送到 IDP 的每个文档进行签名。 此外，客户将期望 IDP 签署发送给它的任何文件。 此开关为所有请求和响应类型设置默认值，但稍后将看到对此进行了一些精细的控制。 
>此设置是可选的，将默认为`false`

-signatureAlgorithm

这是 IDP 希望签名文档使用的签名算法。 

允许的值为：`RSA_SHA1`, `RSA_SHA256`, `RSA_SHA512`, 和 `DSA_SHA1`。 
>此设置是可选的，默认为`RSA_SHA256`

- signatureCanonicalizationMethod

这是 IDP 希望签名文档使用的签名规范化方法。
>此设置是可选的。 默认值`http://www.w3.org/2001/10/xml-exc-c14n#`(对大部分IDPS可用)

- metadataUrl

用于检索 IDP 元数据的 URL，目前仅用于定期获取签名和加密密钥，这允许在 IDP 上循环使用这些密钥，而无需在 SP 端进行手动更改。

- IDP AllowedClockSkew sub element
>可选的`AllowedClockSkew`子属性定义 IDP 和 SP 之间允许的时钟偏差。<br/>
默认值为 0。

```xml
<AllowedClockSkew unit="MILLISECONDS">3500</AllowedClockSkew>
```

- unit

可以定义附加到此属性值的时间单位。 
允许的值为`MICROSECONDS`, `MILLISECONDS`, `MINUTES`, `NANOSECONDS` 和 `SECONDS`（微秒、毫秒、分钟、纳秒和秒）。
>这是可选的。 默认值为`SECONDS`

#### IDP SingleSignOnService sub element

`SingleSignOnService`子元素定义 IDP 的登录 SAML 端点。当它想要登录时， 客户端适配器将发送请求 到 IDP 通过此属性配置登录。

```xml
<SingleSignOnService signRequest="true"
                     validateResponseSignature="true"
                     requestBinding="post"
                     bindingUrl="url"/>
```

以下是此属性的配置属性：

- signRequest

客户是否签署`authn`请求
>此设置是可选的。默认和`IDPsignaturesRequired`值保持一致 

- validateResponseSignature

客户端是否应该期望 IDP 签署从`authn`请求发回的断言响应文档。
>此设置是可选的。默认和`IDP signaturesRequired`值保持一致

- requestBinding

这是用于与 IDP 通信的 SAML 绑定类型。
>此设置是可选的。 默认值为`POST`，但可以将其设置为`REDIRECT`

- responseBinding

SAML 允许客户端请求它希望`authn`响应使用的绑定类型。 这个值可以是`POST`或者`REDIRECT`。
>此设置是可选的。 默认情况下，客户端不会为响应请求特定的绑定类型。

- assertionConsumerServiceUrl

IDP 登录服务应向其发送响应的断言使用者服务 （ACS） 的 URL。 
>此设置是可选的。默认情况下，它未设置，具体取决于 IdP 中的配置。 当设置后，它必须以`/saml`结尾，

例如`http://sp.domain.com/my/endpoint/for/sam`
`AssertionConsumerServiceURL`属性值在`SAML AuthnRequest`消息发送，此属性通常附带`responseBinding`属性。

- bindingUrl

这是客户端将向其发送请求的 IDP 登录服务的 URL。
> 此设置是必需的。

#### IDP SingleLogoutService sub element

`SingleLogoutService`子元素定义 IDP 的注销 SAML 端点。当它想要注销时，客户端适配器将发送请求 到 IDP 通过此属性值注销。


```xml
<SingleLogoutService validateRequestSignature="true"
                     validateResponseSignature="true"
                     signRequest="true"
                     signResponse="true"
                     requestBinding="redirect"
                     responseBinding="post"
                     postBindingUrl="posturl"
                     redirectBindingUrl="redirecturl">
```

- signRequest

客户端是否需要向 IDP 发出注销注销请求。
>此设置是可选的。 默认为`IDP signaturesRequired element`值。

- signResponse

客户端是否需要签署它发送给 IDP 请求的注销响应。
> 此设置是可选的。 默认为`IDP signaturesRequired element`值。

-validateRequestSignature

客户是否需要期望 IDP 签署注销请求文档
>此设置是可选的。默认为`IDP signaturesRequired element`值

-validateResponseSignature

客户是否应该期望 IDP 签署注销响应文档。
>此设置是可选的。默认为`IDP signaturesRequired element`值

- requestBinding

这是用于将 SAML 请求传达给 IDP 的 SAML 绑定类型。
> 此设置是可选的。 默认值为`POST`，但也可以将其设置为`REDIRECT`。

- responseBinding

这是用于将 SAML 响应传达给 IDP 的 SAML 绑定类型。这个值可以是`POST` 或者 `REDIRECT`。
>此设置是可选的。 默认值为`POST` ，也可以将其设置为`REDIRECT`

- postBindingUrl

这是使用 POST 绑定时 IDP 注销服务的 URL。
> 如果使用POST绑定，则此设置是必需的。

- redirectBindingUrl

这是使用重定向绑定时 IDP 注销服务的 URL。
>如果使用`REDIRECT`绑定，则此设置是必需的。

#### IDP Keys sub element

IDP 的密钥子元素仅用于定义用于验证 IDP 签名的文档的证书或公钥。 它的定义方式与SP 的键元素相同。 但同样，只需要定义一个证书或公钥引用。请注意，如果 IDP 和 SP 都由 Keycloak服务器和适配器分别不需要指定用于签名验证的密钥，见下文。
可以将SP配置为自动从已发布的证书中获取用于IDP签名验证的公钥，前提是 SP 和 IDP 都是 由Keycloak实现。 这是通过删除子元素里密钥中签名验证密钥的所有声明来完成的。如果 Keys 子元素将保持为空，则可以完全省略它。然后，SP 会自动从 SAML 描述符中获取密钥， 其位置派生自IDP 单一登录服务子元素中指定的 SAML endpoint URL。 通常用于 SAML 描述符检索的 HTTP 客户端的设置 不需要额外的配置，但是可以在`IDP HttpClient`子元素中进行配置。

还可以指定多个密钥进行签名验证。这是通过声明多个关键元素来完成的 在属性signing设置为`true`的键子元素中。 

例如，在轮换 IDP 签名密钥的情况下，这很有用：有 通常是对新的 SAML 协议消息和断言进行签名的过渡期使用新密钥，但由先前密钥签名的密钥仍应被接受。
无法将KeyCloak配置为同时获取密钥用于自动签名验证并定义其他静态签名验证密钥。

```xml
       <IDP entityID="idp">
            ...
            <Keys>
                <Key signing="true">
                    <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
                        <Certificate alias="demo"/>
                    </KeyStore>
                </Key>
            </Keys>
        </IDP>
```

#### IDP HttpClient sub element

可选的HttpClient子元素定义所使用的 HTTP 客户端的属性 用于自动获取包含用于 IDP 签名的公钥的证书 启用后，通过 IDP 的 SAML 描述符进行验证。

```xml
<HttpClient connectionPoolSize="10"
            disableTrustManager="false"
            allowAnyHostname="false"
            clientKeystore="classpath:keystore.jks"
            clientKeystorePassword="pwd"
            truststore="classpath:truststore.jks"
            truststorePassword="pwd"
            proxyUrl="http://proxy/"
            socketTimeout="5000"
            connectionTimeout="6000"
            connectionTtl="500" />
```

- connectionPoolSize

此配置选项定义应池化与 Keycloak 服务器的连接数。
>这是可选的。 默认值为`10`

- disableTrustManager

如果 Keycloak 服务器需要 HTTPS 并且此配置选项设置为`true`不必指定信任库。 此设置应仅在开发期间使用，切勿在生产中使用，因为它将禁用 SSL 证书的验证。 
>这是可选的。 默认值为`false`

- allowAnyHostname

如果 Keycloak 服务器需要 HTTPS，并且此配置选项设置为`true`通过信任库验证 Keycloak 服务器的证书， 但主机名验证未完成。 此设置只能在开发期间使用，而不应在生产中使用 因为它将部分禁用SSL证书的验证。 此设置在测试环境中可能很有用。
> 这是可选的。 默认值为false

- truststore

该值是信任库文件的文件路径。 如果在路径前面加上`classpath:`前缀，那么信任库将从部署的类路径中获取。 用于到 Keycloak 服务器的传出 HTTPS 通信。 发出 HTTPS 请求的客户端需要一种方法来验证它们正在与之通信的服务器的主机。 这就是信任库的作用。 密钥库包含一个或多个可信主机证书或认证中心。 您可以通过提取 Keycloak 服务器的 SSL 密钥库的公共证书来创建此信任库。

>这是必需的，除非disableTrustManager是true

- truststorePassword

信任库的密码
>`Truststore`设置时这是必需的，并且信任库需要密码。

- clientKeystore

这是密钥库文件的文件路径。 此密钥库包含适配器向 Keycloak 服务器发出 HTTPS 请求时的双向 SSL 客户机证书。

>这是可选的。

- clientKeystorePassword

客户端密钥库和客户端密钥的密码。
>`clientKeystore`设置时，这是必需的。

- proxyUrl

用于 HTTP 连接的 HTTP 代理的 URL。 
>这是可选的。

- socketTimeout
套接字在建立连接后等待数据的超时（以毫秒为单位）。 两个数据包之间的最大非活动时间。

超时值为零为无限超时。 负值被解释为未定义（如果适用，则为系统默认值）。
> 默认值为`-1`， 这是可选的。

- connectionTimeout

与远程主机建立连接的超时（以毫秒为单位）。 超时值为零被解释为无限超时。 负值被解释为未定义（如果适用，则为系统默认值）。
>默认值为`-1`。 这是可选的。

- connectionTtl

客户端的连接生存时间（以毫秒为单位）。 小于或等于零的值被解释为无限值。
>默认值为`-1`。 这是可选的。

### 3.1.2.  JBoss EAP/WildFly 适配器

为了能够保护部署在 JBoss EAP 或 WildFly 上的 WAR 应用程序，必须安装和配置 Keycloak SAML 适配器子系统。

然后，在`WAR`中提供一个`keycloak config`，`/WEB-INF/keycloak-saml.xml`身份验证方法更改为`KEYCLOAK-SAML`

### 3.1.3. 从 ZIP 文件安装适配器

每个适配器都是在Keycloak下载站点上的单独下载。

>Keycloak仅使用最新版本的 WildFly 测试和维护适配器。新版本的 WildFly 发布后，
当前的适配器将被弃用，并且在下一个 WildFly 版本发布后将删除对它们的支持。
另一种选择是将应用程序从 WildFly 切换到 JBoss EAP，因为 JBoss EAP 适配器
的支持时间要长得多。

**步骤**

1.从下载地址安装适用于应用程序服务器的适配器。

> 在 WildFly 或 JBoss EAP 7 上安装：

```bash
$ cd $WILDFLY_HOME
$ unzip keycloak-saml-wildfly-adapter-dist.zip
```

这些 zip 文件在 WildFly 或 JBoss EAP 发行版中创建特定于 WildFly/JBoss EAP SAML 适配器的新 JBoss 模块。

2.使用 CLI 脚本在应用服务器的服务器配置中启用 Keycloak SAML 子系统：`domain.xml`和`standalone.xml`

启动服务器并运行适用于应用程序服务器的脚本。

#### 在 WildFly 上安装。

```bash
$ cd $JBOSS_HOME
$ ./bin/jboss-cli.sh -c --file=bin/adapter-elytron-install-saml.cli
```

该脚本将添加扩展、子系统和可选的安全域，如下所述。

```xml
<server xmlns="urn:jboss:domain:1.4">

    <extensions>
        <extension module="org.keycloak.keycloak-saml-adapter-subsystem"/>
          ...
    </extensions>

    <profile>
        <subsystem xmlns="urn:jboss:domain:keycloak-saml:1.1"/>
         ...
    </profile>
```

当需要创建安全上下文时，在要传播到要调用的 EJB（其他 EE 组件）的安全 Web 层中，安全域应与 EJB 和其他组件一起使用。

否则，此配置是可选的。

```xml
<server xmlns="urn:jboss:domain:1.4">
 <subsystem xmlns="urn:jboss:domain:security:1.2">
    <security-domains>
...
      <security-domain name="keycloak">
         <authentication>
           <login-module code="org.keycloak.adapters.jboss.KeycloakLoginModule"
                         flag="required"/>
          </authentication>
      </security-domain>
    </security-domains>
``` 

安全上下文会自动传播到 EJB 层。

#### JBoss SSO

WildFly 内置了对部署到同一 WildFly 的 Web 应用程序的单点登录支持实例，使用Keycloak时不应启用此功能。

- 为 JSESSIONID cookie 设置 SameSite 值

浏览器计划将`SameSite`属性的默认值从`cookie`设置为`Lax`。此设置意味着仅当请求源自同一域时，才会将 Cookie 发送到应用程序。此行为可能会影响 SAML `POST`绑定可能会变得不起作用。要保留 SAML 适配器的全部功能，建议将容器创建的`JSESSIONID cookie`的`SameSite`值设置为`None`。不这样做可能会导致使用对Keycloak的每个请求重置容器的会话。

>若要避免将`SameSite`属性设置为`None` ，请考虑切换到`REDIRECT`
 `binding`重定向绑定，或者不需要此解决方法的`OIDC 协议`。

要在 Wildfly/EAP 中将`JSESSIONID cookie`的`SameSite`值设置为`None`，请将包含以下内容的`undertow-handlers.conf`文件添加到应用程序的`WEB-INF`目录中。

```
samesite-cookie(mode=None, cookie-pattern=JSESSIONID)
```

从版本 19.1.0 开始，Wildfly 中提供了对此配置的支持。

- 保护WAR

本节介绍如何通过在`WAR`包中添加配置和编辑文件来直接保护`WAR`。

必须做的第一件事是在`WAR`的`WEB-INF`目录中创建一个`keycloak-saml.xml`适配器配置文件。 
此配置文件的格式在常规适配器配置部分中描述。

接下来，必须设置`web.xml`文件里`auth-method`到`KEYCLOAK-SAML`属性。还必须使用标准`servlet`安全性来指定 URL 上基于角色的约束。 

下面是一个示例web.xml文件：

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
      version="3.0">

        <module-name>customer-portal</module-name>

    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Admins</web-resource-name>
            <url-pattern>/admin/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>admin</role-name>
        </auth-constraint>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>
    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Customers</web-resource-name>
            <url-pattern>/customers/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>user</role-name>
        </auth-constraint>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>

    <login-config>
        <auth-method>KEYCLOAK-SAML</auth-method>
        <realm-name>this is ignored currently</realm-name>
    </login-config>

    <security-role>
        <role-name>admin</role-name>
    </security-role>
    <security-role>
        <role-name>user</role-name>
    </security-role>
</web-app>
```

除`auth-method`设置之外的所有标准`Servlet`设置。

#### 使用 Keycloak SAML 子系统保护WARs

不必打开 WAR 即可使用 Keycloak 保护它。 或者，可以通过`Keycloak SAML 适配器子系统`从外部保护它。 虽然不必将 `KEYCLOAK-SAML`指定为`auth-method`，但仍然必须定义 在`web.xml`中定义`security-constraints`。 不必创建`WEB-INF/keycloak-saml.xml`文件。 此元数据改为在服务器的`domain.xml`或`standalone.xml`子系统配置部分的 XML 中定义。

```xml
<extensions>
  <extension module="org.keycloak.keycloak-saml-adapter-subsystem"/>
</extensions>

<profile>
  <subsystem xmlns="urn:jboss:domain:keycloak-saml:1.1">
    <secure-deployment name="WAR MODULE NAME.war">
      <SP entityID="APPLICATION URL">
        ...
      </SP>
    </secure-deployment>
  </subsystem>
</profile>
```

`secure-deployment` `name`属性标识要保护的 `WAR`。 它的值是`.war`附加`web.xml`定义的`module-name`。 其余配置使用与常规适配器配置中定义的keycloak-saml.xml配置相同的 XML 语法。
配置示例：

```xml
<subsystem xmlns="urn:jboss:domain:keycloak-saml:1.1">
  <secure-deployment name="saml-post-encryption.war">
    <SP entityID="http://localhost:8080/sales-post-enc/"
        sslPolicy="EXTERNAL"
        nameIDPolicyFormat="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
        logoutPage="/logout.jsp"
        forceAuthentication="false">
      <Keys>
        <Key signing="true" encryption="true">
          <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
            <PrivateKey alias="http://localhost:8080/sales-post-enc/" password="test123"/>
            <Certificate alias="http://localhost:8080/sales-post-enc/"/>
          </KeyStore>
        </Key>
      </Keys>
      <PrincipalNameMapping policy="FROM_NAME_ID"/>
      <RoleIdentifiers>
        <Attribute name="Role"/>
      </RoleIdentifiers>
      <IDP entityID="idp">
        <SingleSignOnService signRequest="true"
            validateResponseSignature="true"
            requestBinding="POST"
            bindingUrl="http://localhost:8080/realms/saml-demo/protocol/saml"/>

        <SingleLogoutService
            validateRequestSignature="true"
            validateResponseSignature="true"
            signRequest="true"
            signResponse="true"
            requestBinding="POST"
            responseBinding="POST"
            postBindingUrl="http://localhost:8080/realms/saml-demo/protocol/saml"
            redirectBindingUrl="http://localhost:8080/realms/saml-demo/protocol/saml"/>
        <Keys>
          <Key signing="true" >
            <KeyStore resource="/WEB-INF/keystore.jks" password="store123">
              <Certificate alias="saml-demo"/>
            </KeyStore>
          </Key>
        </Keys>
      </IDP>
    </SP>
   </secure-deployment>
</subsystem>
```

### 3.1.4.  Tomcat SAML 适配器

为了能够保护部署在Tomcat 8或9上的WAR应用程序，必须将Keycloak Tomcat SAML适配器附加到Tomcat安装中。 然后，必须在部署到 Tomcat 的每个 WAR 中提供一些额外的配置。

#### 安装适配器

适配器不再包含在设备或 war 发行版中。 每个适配器都是在Keycloak下载站点上的单独下载。 它们也可以作为 maven 工件使用。

**步骤**

1. 从Keycloak下载站点下载系统上Tomcat版本的适配器：
2. 在系统上安装Tomcat版本：

- 在 Tomcat 8 或 9 上安装：

```bash
$ cd $TOMCAT_HOME/lib
$ unzip keycloak-saml-tomcat-adapter-dist.zip
```

>将适配器的 jar 包含在`WEB-INF/lib`目录中将不起作用。`Keycloak SAML 适配器`是作为`Valve`实现的，阀门代码必须驻留在 Tomcat的主`lib/`目录中。

#### 保护WAR

此过程通过在 WAR 包中添加配置和编辑文件来直接保护 WAR。

**步骤**

1.	在 WAR 包中创建`META-INF/context.xml`文件。 这是一个特定于 Tomcat 的配置文件，必须定义一个特定于 Keycloak 的值。

```xml
<Context path="/your-context-path">
    <Valve className="org.keycloak.adapters.saml.tomcat.SamlAuthenticatorValve"/>
</Context>
```

2.	在 WAR 的`WEB-INF`目录中创建`keycloak-saml.xml`适配器配置文件。 此配置文件的格式在常规适配器配置部分中描述。

3.	指定`login-config`并使用标准`servlet`安全性来指定 URL 上基于角色的约束。 下面是一个示例：

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
      version="3.0">

        <module-name>customer-portal</module-name>

    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Customers</web-resource-name>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>user</role-name>
        </auth-constraint>
    </security-constraint>

    <login-config>
        <auth-method>BASIC</auth-method>
        <realm-name>this is ignored currently</realm-name>
    </login-config>

    <security-role>
        <role-name>admin</role-name>
    </security-role>
    <security-role>
        <role-name>user</role-name>
    </security-role>
</web-app>
```
如果未在`keycloak-saml.xml`显式设置`assertionConsumerServiceUrl`，SAML 适配器将在`/my-context-path/saml`隐式侦听 SAML 断言。这必须在IDP realm/客户端设置中匹配`Master SAML Processing URL`，例如`http://sp.domain.com/my-context-path/saml。`

如果没有，Tomcat 可能会无限重定向到 IDP 登录服务，因为它在用户登录后不会收到 SAML 断言。

- 为 JSESSIONID cookie 设置 SameSite 值

浏览器计划将`SameSite`属性的默认值从`cookie`设置为`Lax`。此设置意味着仅当请求源自同一域时，才会将 Cookie 发送到应用程序。此行为可能会影响 SAML `POST`绑定可能会变得不起作用。要保留 SAML 适配器的全部功能，建议将容器创建的`JSESSIONID cookie`的`SameSite`值设置为`None`。不这样做可能会导致使用对Keycloak的每个请求重置容器的会话。

>若要避免将`SameSite`属性设置为`None` ，请考虑切换到`REDIRECT`
 `binding`重定向绑定，或者不需要此解决方法的`OIDC 协议`。

要在Tomcat中将`JSESSIONID cookie SameSite`值设置为`None`，请将以下配置添加到应用程序的`context.xml`。请注意，这会将把Tomcat容器创建的所有`cookie SameSite`值设置为`None`。

```xml
<CookieProcessor sameSiteCookies="None" />
```

>不可能仅cookie的部分子集指定`SameSite`属性，因此应用程序
创建的所有cookies的该属性字段都将为`None`
Tomcat 从版本 9.0.29 和 8.5.49 开始支持此功能。

### 3.1.5.  Jetty SAML 适配器

为了能够保护部署在 Jetty 上的 WAR 应用程序，必须将`Keycloak Jetty 9.4 SAML`适配器附加到 Jetty 安装中。然后，在部署到 Jetty 的每个 WAR 中提供一些额外的配置。

使用以下安装和配置步骤。

#### Jetty 9安装适配器
Keycloak有一个单独的SAML适配器，用于Jetty 9.4。适配器不再包含在设备或 war 发行版中。每个适配器都是在Keycloak下载站点上的单独下载。 它们也可以作为 maven 工件使用。

**步骤**

1.	从Keycloak Downloads网站下载KeycloakJetty 9.4适配器ZIP包。

2.	将 Jetty 9.4 发行版解压缩到 Jetty 9.4 的根目录中。
	在`WEB-INF/lib`目录中包含适配器的 jar 将不起作用。

```bash    
$ cd $JETTY_HOME
$ unzip keycloak-saml-jetty94-adapter-dist.zip
```

3.	为您的 jetty.base 启用 keycloak 模块。

```bash
$ cd your-base
$ java -jar $JETTY_HOME/start.jar --add-to-startd=keycloak
```

#### Jetty 9 WAR 配置

使用此流程可直接保护 WAR。

**步骤**
1.	在 WAR 包中创建`WEB-INF/jetty-web.xml`文件。 这是一个特定于 Jetty 的配置文件，必须在其中定义特定于 Keycloak 的身份验证器。

```xml
<?xml version="1.0"?>
	<!DOCTYPE Configure PUBLIC "-//Mort Bay Consulting//DTD Configure//EN" "http://www.eclipse.org/jetty/configure_9_0.dtd">
<Configure class="org.eclipse.jetty.webapp.WebAppContext">
    <Get name="securityHandler">
        <Set name="authenticator">
            <New class="org.keycloak.adapters.saml.jetty.KeycloakSamlAuthenticator">
            </New>
        </Set>
    </Get>
</Configure>
```

2.	在 WAR 的`WEB-INF`目录中创建`keycloak-saml.xml`适配器配置文件。 此配置文件的格式在常规适配器配置部分中描述。

3.	指定`login-config`并使用标准`servlet`安全性来指定 URL 上基于角色的约束。下面是一个示例：
```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
      version="3.0">

        <module-name>customer-portal</module-name>

    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Customers</web-resource-name>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>user</role-name>
        </auth-constraint>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>

    <login-config>
        <auth-method>BASIC</auth-method>
        <realm-name>this is ignored currently</realm-name>
    </login-config>

    <security-role>
        <role-name>admin</role-name>
    </security-role>
    <security-role>
        <role-name>user</role-name>
    </security-role>
</web-app>
```

### 3.1.6. Java Servlet 过滤器适配器
如果要将SAML与没有该servlet平台的适配器的Java Servlet应用程序一起使用，则可以选择使用 Keycloak 拥有的`servlet过滤器适配器`。 此适配器的工作方式与其他适配器略有不同。 仍然必须指定`/WEB-INF/keycloak-saml.xml`文件中定义的文件 常规适配器配置部分，但是, 没有在`Web.xml`中定义安全约束。 相反，可以使用`Keycloak servlet 过滤器适配器`定义过滤器映射，以保护要保护的 url 模式。
>后端注销的工作方式与标准适配器略有不同。 
它不会使 http 会话失效，而是将会话 ID 标记为已注销。 
只是没有办法根据会话 ID 任意使 HTTP 会话失效。<br/>
**当具有使用 SAML 筛选器的群集应用程序时，后台注销不起作用。**

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
      version="3.0">

        <module-name>customer-portal</module-name>

    <filter>
        <filter-name>Keycloak Filter</filter-name>
        <filter-class>org.keycloak.adapters.saml.servlet.SamlFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>Keycloak Filter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

Keycloak 过滤器具有与其他适配器相同的配置参数，但必须将它们定义为过滤器初始化参数而不是上下文参数。

如果有各种不同的安全和不安全 URL 模式，则可以定义多个筛选器映射。

>必须具有涵盖`/saml`的筛选器映射。 此映射涵盖所有服务器回调。

向 IdP 注册 SP 时，必须注册`http[s]://hostname/{context-root}/saml`为断言使用者服务 URL 和单点注销服务 URL。
要使用此过滤器，请将此 maven 工件包含在您的 WAR poms 中：

```xml
<dependency>
   <groupId>org.keycloak</groupId>
   <artifactId>keycloak-saml-servlet-filter-adapter</artifactId>
   <version>20.0.0</version>
</dependency>
```

为了使用多租户，keycloak.config.resolver参数应作为过滤器参数传递。

```xml
    <filter>
        <filter-name>Keycloak Filter</filter-name>
        <filter-class>org.keycloak.adapters.saml.servlet.SamlFilter</filter-class>
        <init-param>
            <param-name>keycloak.config.resolver</param-name>
            <param-value>example.SamlMultiTenantResolver</param-value>
        </init-param>
    </filter>
```

### 3.1.7. 向Identity Provider身份提供商注册

对于每个基于 servlet 的适配器，为断言使用者服务 URL 和单点注销服务注册的端点必须是附加在 servlet 应用程序基础URL后面的/saml，即`https://example.com/contextPath/saml`

### 3.1.8. 注销

可以通过多种方式从 Web 应用程序注销。 对于 Jakarta EE servlet 容器，可以调用`HttpServletRequest.logout()`。对于任何其他浏览器应用程序，可以将浏览器指向Web 应用程序具有安全约束并传入查询参数  GLO, i.e. `http://myapp?GLO=true`的任何 URL，即将会注销你与浏览器有的 SSO 会话。

#### 在群集环境中注销

在内部，SAML 适配器存储 SAML 会话索引、主体名称（如果已知）和 HTTP 会话 ID 之间的映射。 此映射可以在 JBoss 应用程序服务器系列（WildFly 10/11、EAP 6/7）中跨集群维护，以便可分发 应用。作为前提条件，HTTP 会话需要跨集群分布（即`i.e. application`在`web.xml`标记`<distributable/>`）。
要启用该功能，请将以下部分添加到`/WEB_INF/web.xml`文件中：

对于EAP 7，WildFly 10/11：

```xml
<context-param>
    <param-name>keycloak.sessionIdMapperUpdater.classes</param-name>
    <param-value>org.keycloak.adapters.saml.wildfly.infinispan.InfinispanSessionCacheIdMapperUpdater</param-value>
</context-param>
```

对于 EAP 6：

```xml
<context-param>
    <param-name>keycloak.sessionIdMapperUpdater.classes</param-name>
    <param-value>org.keycloak.adapters.saml.jbossweb.infinispan.InfinispanSessionCacheIdMapperUpdater</param-value>
</context-param>
```

如果部署的会话缓存已命名`deployment-cache`，则将`deployment-cache.ssoCache`命名用于 SAML 映射的缓存。缓存的名称可以被上下文`keycloak.sessionIdMapperUpdater.infinispan.cacheName`参数覆盖。包含缓存的缓存容器将与包含部署会话缓存，但可由上下文`keycloak.sessionIdMapperUpdater.infinispan.containerName`参数覆盖的缓存。

默认情况下，SAML 映射缓存的配置将派生自会话缓存。配置可以在服务器的缓存配置部分中手动覆盖，就像其他缓存一样。

目前，为了提供可靠的服务，建议对 SAML 会话缓存使用复制缓存。 使用分布式缓存可能会导致 SAML 注销请求登陆到没有访问权限的节点 到 SAML 会话索引到 HTTP 会话映射，这将导致注销失败。

#### 跨中心注销方案

跨站点方案仅适用于 WildFly 10 及更高版本，以及 EAP 7 及更高版本。
处理跨多个数据中心的会话需要特殊处理，在以下场景：

1.	登录请求在数据中心 1 的集群内处理。

2.	管理员发出特定 SAML 会话的注销请求，该请求位于数据中心 2。

数据中心 2 必须注销数据中心 1（以及所有其他数据中心 共享 HTTP 会话）。
要涵盖这种情况，需要复制上述SAML 会话缓存 不仅在单个集群内，而且跨所有数据中心，例如通过独立的[]
Infinispan/JDG服务器](https://access.redhat.com/documentation/en-us/red_hat_data_grid/6.6/html/administration_and_configuration_guide/chap-externalize_sessions#Externalize_HTTP_Session_from_JBoss_EAP_6.x_to_JBoss_Data_Grid)：

1.	必须将缓存添加到独立的Infinispan/JDG服务器。

2.	必须将上一项中的缓存添加为相应 SAML 会话缓存的远程存储。

在部署期间发现远程存储在 SAML 会话缓存中后，将监视其更改并且本地 SAML 会话缓存会相应地更新。

### 3.1.9. 获取断言属性

成功登录 SAML 后，应用程序代码可能希望获取随 SAML 断言传递的属性值。`HttpServletRequest.getUserPrincipal()`返回一个`Principal对象`，可以将该对象类型转换为 Keycloak 特定`org.keycloak.adapters.saml.SamlPrincipal类`。 此对象允许查看原始断言，还具有方便查找属性值的函数。

```java
package org.keycloak.adapters.saml;

public class SamlPrincipal implements Serializable, Principal {
    /**
     * Get full saml assertion
     *
     * @return
     */
    public AssertionType getAssertion() {
       ...
    }

    /**
     * Get SAML subject sent in assertion
     *
     * @return
     */
    public String getSamlSubject() {
        ...
    }

    /**
     * Subject nameID format
     *
     * @return
     */
    public String getNameIDFormat() {
        ...
    }

    @Override
    public String getName() {
        ...
    }

    /**
     * Convenience function that gets Attribute value by attribute name
     *
     * @param name
     * @return
     */
    public List<String> getAttributes(String name) {
        ...

    }

    /**
     * Convenience function that gets Attribute value by attribute friendly name
     *
     * @param friendlyName
     * @return
     */
    public List<String> getFriendlyAttributes(String friendlyName) {
        ...
    }

    /**
     * Convenience function that gets first  value of an attribute by attribute name
     *
     * @param name
     * @return
     */
    public String getAttribute(String name) {
        ...
    }

    /**
     * Convenience function that gets first  value of an attribute by attribute name
     *
     *
     * @param friendlyName
     * @return
     */
    public String getFriendlyAttribute(String friendlyName) {
        ...
    }

    /**
     * Get set of all assertion attribute names
     *
     * @return
     */
    public Set<String> getAttributeNames() {
        ...
    }

    /**
     * Get set of all assertion friendly attribute names
     *
     * @return
     */
    public Set<String> getFriendlyNames() {
        ...
    }
}
```

### 3.1.10. 错误处理

Keycloak 为基于 servlet 的客户端适配器提供了一些错误处理工具。 当身份验证中遇到错误时，客户端适配器将调用`HttpServletResponse.sendError()`。 可以在`web.xml`文件中设置一个`error-page`，以根据需要处理错误。 客户端适配器可能会引发 `400`、`401`、`403` 和 `500` 错误。

```xml
<error-page>
    <error-code>403</error-code>
    <location>/ErrorHandler</location>
</error-page>
```

客户端适配器还会设置可以检索```HttpServletRequest```的属性。 属性名称为```org.keycloak.adapters.spi.AuthenticationError```，将此对象类型转换为：```org.keycloak.adapters.saml.SamlAuthenticationError```。 这个类可以准确地告诉发生了什么。 如果未设置此属性，则适配器不负责错误代码处理。

```java
public class SamlAuthenticationError implements AuthenticationError {
    public static enum Reason {
        EXTRACTION_FAILURE,
        INVALID_SIGNATURE,
        ERROR_STATUS
    }

    public Reason getReason() {
        return reason;
    }
    public StatusResponseType getStatus() {
        return status;
    }
}
```

### 3.1.11. 故障排除

解决问题的最佳方法是在客户端适配器和 Keycloak 服务器中启用 SAML 调试。使用日志记录框架，将`org.keycloak.saml`包的日志级别设置为`DEBUG`。启用此选项后，可以查看发送到服务器和从服务器发送的 SAML 请求和响应文档。

### 3.1.12. 多租户

SAML 提供与 OIDC多租户相同的功能，这意味着可以使用多个 Keycloak Realms保护单个目标应用程序 （WAR）。`Realms`可以位于同一个 Keycloak 实例上，也可以位于不同的实例上。

为此，应用程序必须具有多个`keycloak-saml.xml`适配器配置文件。

虽然可以将多个 WAR 实例与不同的适配器配置文件部署到不同的上下文路径，但这可能很不方便，可能还希望根据上下文路径以外的内容选择领域。

Keycloak 使自定义配置解析程序成为可能，因此可以选择用于每个请求的适配器配置。在 SAML 中，配置仅在登录处理中有意义;用户登录后，会话将进行身份验证，这时`keycloak-saml.xml`返回是否不同并不重要。因此，为同一会话返回相同的配置十分重要。

为此，请创建`org.keycloak.adapters.saml.SamlConfigResolver`的实现。以下示例使用Host 头来查找正确的配置，并从应用程序的 Java 类路径中加载它和关联的元素：

```java
package example;

import java.io.InputStream;
import org.keycloak.adapters.saml.SamlConfigResolver;
import org.keycloak.adapters.saml.SamlDeployment;
import org.keycloak.adapters.saml.config.parsers.DeploymentBuilder;
import org.keycloak.adapters.saml.config.parsers.ResourceLoader;
import org.keycloak.adapters.spi.HttpFacade;
import org.keycloak.saml.common.exceptions.ParsingException;

public class SamlMultiTenantResolver implements SamlConfigResolver {

    @Override
    public SamlDeployment resolve(HttpFacade.Request request) {
        String host = request.getHeader("Host");
        String realm = null;
        if (host.contains("tenant1")) {
            realm = "tenant1";
        } else if (host.contains("tenant2")) {
            realm = "tenant2";
        } else {
            throw new IllegalStateException("Not able to guess the keycloak-saml.xml to load");
        }

        InputStream is = getClass().getResourceAsStream("/" + realm + "-keycloak-saml.xml");
        if (is == null) {
            throw new IllegalStateException("Not able to find the file /" + realm + "-keycloak-saml.xml");
        }

        ResourceLoader loader = new ResourceLoader() {
            @Override
            public InputStream getResourceAsStream(String path) {
                return getClass().getResourceAsStream(path);
            }
        };

        try {
            return new DeploymentBuilder().build(is, loader);
        } catch (ParsingException e) {
            throw new IllegalStateException("Cannot load SAML deployment", e);
        }
    }
}
```

还必须在`web.xml`文件中使用`SamlConfigResolver`并配置`keycloak.config.resolve`上下文参数

```xml
<web-app>
    ...
    <context-param>
        <param-name>keycloak.config.resolver</param-name>
        <param-value>example.SamlMultiTenantResolver</param-value>
    </context-param>
</web-app>
```

### 3.1.13. 从旧版本迁移

- 迁移到 1.9.0

SAML SP 客户端适配器更改

Keycloak SAML SP 客户端适配器现在需要一个特定的endpoint，`/saml`才能注册到 IdP。 除了它具有的任何其他绑定之外，SamlFilter 还必须绑定到 /saml。这样做，是因为`SAML POST`绑定会处理请求输入流，直接影响依赖它的客户端。

## 3.2. mod_auth_mellon Apache HTTPD 模块

`mod_auth_mellon`模块是用于SAML的Apache HTTPD插件。如果现在的语言/环境支持使用 Apache HTTPD 作为代理，那么可以使用 mod_auth_mellon 通过 SAML 保护您的 Web 应用程序。有关此模块的更多详细信息，请参阅GitHub 存储库mod_auth_mellon。

要配置mod_auth_mellon需要：

- 身份提供程序 （IdP） 实体描述符 XML 文件，用于描述与 Keycloak 或其他 SAML IdP 的连接
- SP 实体描述符 XML 文件，用于描述要保护的应用程序的 SAML 连接和配置。
- 私钥 PEM 文件，它是 PEM 格式的文本文件，用于定义应用程序用于签署文档的私钥。
- 证书 PEM 文件，它是定义应用程序的证书的文本文件。
- 特定于mod_auth_mellon的 Apache HTTPD 模块配置。

如果已经在 Keycloak 应用程序服务器上的某个Realm中定义并注册了客户端应用程序，那么 Keycloak 可以生成除 Apache HTTPD 模块配置之外的所有文件。

执行以下过程以生成 Apache HTTPD 模块配置。

**步骤**

1.	转到 SAML 客户端的“Installation”页面。


2.	选择`Mod Auth Mellon`文件选项。

`mod_auth_mellon`配置下载
![mod-auth-mellon-config-download](/images/mod-auth-mellon-config-download.png)

3.	单击下载以下载包含所需 XML 描述符和 PEM 文件的 ZIP 文件。

### 3.2.1. 使用Keycloak配置`mod_auth_mellon`

涉及两个主机：
- 运行 Keycloak 的主机，称为 $idp_host，因为 Keycloak 是 SAML 身份提供程序 （IdP）。
- 运行 Web 应用程序的主机，称为 $sp_host。在 SAML 中，使用 IdP 的应用程序称为服务提供商 （SP）。

以下所有步骤都需要在具有根权限的 $sp_host 上执行。

#### 安装软件包

要安装必要的软件包，将需要：
- Apache Web Server （httpd）
- 用于 Apache 的 Mellon SAML SP 附加模块
- 用于创建 X509 证书的工具

要安装必要的软件包，请运行以下命令：

```bash
yum install httpd mod_auth_mellon mod_ssl openssl
```

#### 为 Apache SAML 创建配置目录

建议将与 Apache 使用 SAML 相关的配置文件保存在一个位置。

在 Apache 配置根`/etc/httpd`下创建一个名为`saml2`的新目录：

```bash
mkdir /etc/httpd/saml2
```

#### 配置 Mellon Service Provider

Apache 附加模块的配置文件位于`/etc/httpd/conf.d`目录中，文件扩展名为`.conf`。需要创建`/etc/httpd/conf.d/mellon.conf`文件并将 Mellon 的配置指令放入其中。

Mellon的配置指令大致可以分为两类信息：

- 使用 SAML 身份验证保护哪些网址
- 引用受保护的 URL 时将使用哪些 SAML 参数。

Apache 配置指令通常遵循 URL 空间中的分层树结构，称为位置。需要指定一个或多个 URL 位置供 Mellon 保护。可以灵活地添加适用于每个位置的配置参数。可以将所有必要的参数添加到位置块，也可以将 Mellon 参数添加到特定受保护位置继承的 URL 位置层次结构中较高的公共位置（或两者的某种组合）。由于无论哪个位置触发 SAML 操作，SP 通常都以相同的方式运行，因此此处使用的示例配置将通用 Mellon 配置指令放在层次结构的根目录中，然后可以使用最少的指令定义要受 Mellon 保护的特定位置。此策略可避免为每个受保护位置重复相同的参数。

此示例只有一个受保护的位置：https：//$sp_host/private。

要配置提供程序，请执行以下步骤。

**步骤**

1.	创建包含以下内容的文件 `/etc/httpd/conf.d/mellon.conf`：

```conf
 <Location / >
    MellonEnable info
    MellonEndpointPath /mellon/
    MellonSPMetadataFile /etc/httpd/saml2/mellon_metadata.xml
    MellonSPPrivateKeyFile /etc/httpd/saml2/mellon.key
    MellonSPCertFile /etc/httpd/saml2/mellon.crt
    MellonIdPMetadataFile /etc/httpd/saml2/idp_metadata.xml
 </Location>
 <Location /private >
    AuthType Mellon
    MellonEnable auth
    Require valid-user
 </Location>
 ```

>上述代码中引用的某些文件将在后续步骤中创建。

### 3.2.2. 为mod_auth_mellon使用的 Cookie 设置SameSite值

浏览器计划将`SameSite`属性的默认值从`cookie`设置为`Lax`。此设置意味着 仅当请求源自同一域时，才会将 Cookie 发送到应用程序。此行为可能会影响`SAML POST`绑定可能会变得不起作用。为了保留`mod_auth_mellon`模块的全部功能， 建议将由`mod_auth_mellon`创建的`cookie SameSite`值设置为`None`。不这样做可能会导致无法使用Keycloak登录。

要将SameSite值设置为`None`，请在`mellon.conf`文件中添加以下配置到`<Location / >`标签。

```conf
MellonSecureCookie On
MellonCookieSameSite none
```

版本 0.16.0 的mod_auth_mellon模块中提供了对此配置的支持。

#### 创建服务提供程序Service Provider 元数据

在 SAML 中，IdP 和 SP 交换 XML 格式的 SAML 元数据。元数据的架构是一个标准，因此确保参与的 SAML 实体可以使用彼此的元数据。

需要：

- SP 使用的 IdP 的元数据
- 描述提供给 IdP 的 SP 的元数据
SAML 元数据的组成部分之一是 X509 证书。这些证书用于两个目的：
- 对 SAML 消息进行签名，以便接收端可以证明消息来自预期参与方。
- 在传输过程中加密邮件（很少使用，因为 SAML 邮件通常出现在受 TLS 保护的传输上）

如果已有证书颁发机构 （CA），则可以使用自己的证书，也可以生成自签名证书。为简单起见，此示例使用自签名证书。

由于 Mellon的 SP 元数据必须反映已安装的 mod_auth_mellon 版本的功能，必须是有效的 SP 元数据 XML，并且必须包含 X509 证书（除非熟悉 X509 证书生成，否则其创建可能会很繁琐），因此生成 SP 元数据的最便捷方法是使用 mod_auth_mellon 包中包含的工具 （mellon_create_metadata.sh）。生成的元数据始终可以在以后进行编辑，因为它是一个文本文件。该工具还会创建 X509 密钥和证书。

SAML IdP 和 SP 使用称为实体 ID 的唯一名称来标识自己。要使用Mellon元数据创建工具，此时需要：

- 实体 ID，通常是 SP 的 URL，通常是可在其中检索 SP 元数据的 SP 的 URL
- 将使用 SP 的 SAML 消息的 URL，Mellon 称之为 MellonEndPointPath。

要创建 SP 元数据，请执行以下步骤。

**步骤**

1. 创建一些helper shell变量：

```bash
fqdn=`hostname`
mellon_endpoint_url="https://${fqdn}/mellon"
mellon_entity_id="${mellon_endpoint_url}/metadata"
file_prefix="$(echo "$mellon_entity_id" | sed 's/[^A-Za-z.]/_/g' | sed 's/__*/_/g')"
```

2. 通过运行以下命令调用Mellon metadata创建工具：

```bash
/usr/libexec/mod_auth_mellon/mellon_create_metadata.sh $mellon_entity_id $mellon_endpoint_url
```

3.	将生成的文件移动到其目标（在上面创建的`/etc/httpd/conf.d/mellon.conf`文件中引用）：
```bash
mv ${file_prefix}.cert /etc/httpd/saml2/mellon.crt
mv ${file_prefix}.key /etc/httpd/saml2/mellon.key
mv ${file_prefix}.xml /etc/httpd/saml2/mellon_metadata.xml
```

#### 将Mellon Service Provider添加到 Keycloak Identity Provider

假设：Keycloak IdP 已经安装在 $idp_host 上。

Keycloak 支持多个租户，其中所有用户、客户端等都分组到所谓的realm中。每个realm都独立于其他realm。可以在 Keycloak 中使用现有realm，但此示例展示了如何创建一个名为 test_realm 的新realm并使用该realm。

所有这些操作都是使用Keycloak管理控制台执行的。您必须具有 $idp_host 的管理员用户名和密码才能执行以下过程。

**步骤**

1.	打开管理控制台，然后输入管理员用户名和密码登录。

登录到管理控制台后，将有一个现有realm。首次设置 Keycloak 时，默认情况下会创建Root realm master。以前创建的任何realm都会列在管理控制台左上角的下拉列表中。

2.	从realm下拉列表中选择`add realm`。

3.	在名称字段中键入`test_realm`，然后单击创建。

将Mellon Service Provider添加为realm的客户端

在Keycloak中，SAML SP被称为客户端。要添加 SP，我们必须位于域的“客户端”部分。

1.	单击左侧的客户端菜单项，然后单击右上角的创建以创建新客户端。

添加Mellon SP 客户端
要添加Mellon  SP 客户端，请执行以下步骤。

**步骤**

1.	将客户端协议设置为 SAML。

2.	从“客户端协议”下拉列表中，选择`saml`。

3.	提供上面创建的Mellon SP 元数据文件 （/etc/httpd/saml2/mellon_metadata.xml）。

根据浏览器的运行位置，可能需要将 SP 元数据从 $sp_host 复制到运行浏览器的计算机，以便浏览器可以找到该文件。
4.	单击保存。

#### 编辑Mellon SP 客户端

使用此流程可以设置重要的客户端配置参数。
步骤

1.	确保`Force POST Binding`已打开。

2.	将`paosResponse`添加到有效重定向 URI列表：

3.	复制`Valid Redirect URIs`中的响应URL，并将其粘贴到`+`正下方的空添加文本字段中。

4.	将`postResponse`更改为`paosResponse`。（SAML ECP 需要 paosResponse URL)

5.	点击底部的保存。

许多 SAML SP 根据用户在组中的成员身份确定授权。Keycloak IdP 可以管理用户组信息，但不会提供用户的组，除非 IdP 配置为将其作为 SAML 属性提供。
执行以下流程以将 IdP 配置为将用户的组作为 SAML 属性提供

**步骤**

1.	单击客户端的`Mappers`选项卡。

2.	在Mappers 页面的右上角，单击`Create`。

3.	从Mappers类型下拉列表中选择`Group list`。

4.	将`Name`设置为`group list`。

5.	将 SAML 属性名称设置为`groups`。

6.	单击保存。

其余步骤在 $sp_host 上执行。

#### 检索Identity Provider 元数据

现在，已经在 IdP 上创建了realm，需要检索与其关联的 IdP 元数据，以便 Mellon SP 识别它。在之前创建的`/etc/httpd/conf.d/mellon.conf`文件中，`MellonIdPMetadataFile`被指定为`/etc/httpd/saml2/idp_metadata.xml`但直到现在该文件还不存在在 $sp_host 上。

使用此步骤从 IdP 检索该文件。

**步骤**
1.	使用此命令，用正确的 $idp_host 值替换：

```bash
curl -k -o /etc/httpd/saml2/idp_metadata.xml \
https://$idp_host/realms/test_realm/protocol/saml/descriptor
```
Mellon现已完全配置。
2.	要对 Apache 配置文件运行语法检查，请使用以下命令：

```bash
apachectl configtest
```

>Configtest 等效于 apachectl 的 -t 参数。
如果配置测试显示任何错误，请先更正这些错误，然后再继续。

3.	重新启动 Apache 服务器：

```bash
systemctl restart httpd.service
```
现在，已将 Keycloak 设置为test_realm中的 SAML IdP，mod_auth_mellon设置为 SAML SP，通过针对`$idp_host` IdP 进行身份验证来保护 URL $sp_host/protected（及其下的所有内容）。

# 4. 使用客户注册服务

为了使应用程序或服务使用 Keycloak，它必须在 Keycloak 中注册客户端。 管理员可以通过管理控制台（或管理员 REST endpoint）执行此操作，但客户端也可以通过 Keycloak 客户端注册自己的客户端注册服务。
客户端注册服务提供对 Keycloak 客户端Representations、OpenID Connect 客户端元数据和 SAML 实体描述符的内置支持。 客户端注册服务终结点是`/realms/<realm>/clients-registrations/<provider>`

支持的内置`providers`包括：

- 默认 -Keyclock客户端Representations （JSON）
- 安装 - Keyclock适配器配置 （JSON）
- openid-connect - OpenID Connect Client 元数据描述（JSON）
- saml2-entity-descriptor - SAML 实体描述 （XML）
以下部分将介绍如何使用不同的提供程序。

## 4.1. 身份验证

要调用客户端注册服务，通常需要一个token。token可以是bearer  token、initial access token或registration access token。 还有一种无需任何token即可注册新客户端的替代方法，但需要配置客户端注册策略（见下文）。

### 4.1.1. Bearer token
Bearer  token可以代表用户或服务帐户颁发。调用endpoint需要以下权限（有关详细信息，请参阅[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)）：

- 创建客户端或管理客户端 - 创建客户端
- 查看客户端或管理客户端 - 查看客户端
- 管理客户端 - 更新或删除客户端

如果使用Bearer token创建客户端，建议使用仅具有create-client角色的服务帐户中的token（有关更多详细信息，请参阅[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)）。

### 4.1.2. Initial Access Token

注册新客户端的建议方法是使用Initial Access Token。Initial Access Token只能用于创建客户端，并且具有可配置的过期时间以及对可以创建的客户端数量的可配置限制。

可以通过管理控制台创建Initial Access Token。 要创建新的Initial Access Token，请先在管理控制台中选择`Realm Settings`，然后在左侧菜单中单击`Client Registration`，然后单击页面中显示的选项卡。最后点击`Initial Access Tokens`子标签。

现在，将能够看到任何现有的Initial Access Tokens。如果有访问权限，则可以删除不再需要的令牌。只有当创建时能检索查看token的值。要创建新token，请单击`Create`，可以选择添加token的有效期，以及可以使用token创建客户端数。单击后`Save`，将显示其值。

现在复制/粘贴此token非常重要，因为以后将无法查看它的值。如果忘记复制/粘贴它，请删除token并创建另一个token。

token在调用客户端注册服务时用作标准bearer token，方法是将其添加到请求中的授权标头。 例如：

```
Authorization: bearer eyJhbGciOiJSUz...
```

### 4.1.3. Registration Access Token

通过客户端注册服务创建客户端时，响应将包括Registration Access Token。Registration Access Token提供检索客户端配置以及更新或删除客户端的访问权限。 Registration Access Token包含在请求中的方式与bearer token或Initial Access Token相同。 Registration Access Token仅有效一次，使用时响应将包含新Token。

如果客户端是在客户端注册服务外部创建的，则不会有与之关联Registration Access Token，可以通过管理控制台创建一个。如果丢失了特定客户端的Token，要创建新Token，请在管理控制台中找到客户端，单击`Credentials`，然后点`Generate registration access token`。

## 4.2. Keycloak Representations

`default`客户端registration provider可用于创建、检索、更新和删除客户端。 它使用Keycloak Client Representation格式，该格式支持完全按照管理员在admin控制台配置的方式配置客户端，包括例如配置协议映射器。

要创建客户端，请创建Client Representation（JSON），然后执行 HTTP POST 请求到`/realms/<realm>/clients-registrations/default`。

它将返回一个Client Representation，其中还包括registration access token。 如果要检索配置、更新或删除客户端，则应将registration access token保存在某个位置。

要检索客户端表示形式，请执行 HTTP GET 请求`/realms/<realm>/clients-registrations/default/<client id>`

它还将返回新的registration access token。

要更新客户端表示，请使用更新的客户端表示执行 HTTP PUT 请求`/realms/<realm>/clients-registrations/default/<client id>`

它还将返回新的registration access token。

要删除客户端表示形式，请执行 HTTP DELETE 请求`/realms/<realm>/clients-registrations/default/<client id>`

## 4.3. Keycloak适配器配置

installation客户端registration provider可用于检索客户端的适配器配置。 除了token身份验证之外，您还可以使用 HTTP 基本身份验证使用客户端凭据进行身份验证。 为此，请在请求中包含以下标头：

```
Authorization: basic BASE64(client-id + ':' + client-secret)
```

要检索适配器配置，请执行 HTTP GET 请求`/realms/<realm>/clients-registrations/install/<client id>`

公共客户端不需要身份验证。 这意味着对于 JavaScript 适配器，您可以使用上述 URL 直接从 Keycloak 加载客户端配置。

## 4.4. OpenID Connect动态客户端注册

Keycloak实现了[OpenID Connect动态客户端注册](https://openid.net/specs/openid-connect-registration-1_0.html)，它扩展了[OAuth 2.0动态客户端注册协议](https://datatracker.ietf.org/doc/html/rfc7591)和[OAuth 2.0动态客户端注册管理协议](https://datatracker.ietf.org/doc/html/rfc7592)。

使用这些规范在 Keycloak 中注册客户端的endpoint是`/realms/<realm>/clients-registrations/openid-connect[/<client id>]`

此endpoint也可以在realm的 OpenID Connect Discovery endpoint中找到,`/realms/<realm>/.well-known/openid-configuration`

## 4.5. SAML 实体描述符

SAML Entity Descriptor endpoint仅支持使用 SAML v2 实体描述符创建客户端。 它不支持检索、更新或删除客户端。 对于这些操作，应使用 Keycloak representation endpoints。 创建客户端时，将返回 Keycloak Client Representation，其中包含有关所创建客户端的详细信息，包括registration access token。

要创建客户端，请使用 SAML Entity Descriptor执行 HTTP POST 请求`/realms/<realm>/clients-registrations/saml2-entity-descriptor`

## 4.6. 使用 CURL 的示例
下面的示例使用CURL 创建一个clientId 为`myclient`的客户端。需要替换`eyJhbGciOiJSUz…`为有效的initial access token 或 bearer token。

```bash
curl -X POST \
    -d '{ "clientId": "myclient" }' \
    -H "Content-Type:application/json" \
    -H "Authorization: bearer eyJhbGciOiJSUz..." \
    http://localhost:8080/realms/master/clients-registrations/default
```

## 4.7. 使用 Java 客户端注册 API 的示例

客户端注册 Java API 使使用 Java 的客户端注册服务变得容易。 使用Maven 依赖项`org.keycloak:keycloak-client-registration-api:>VERSION<`。

有关使用客户端注册的完整说明，请参阅 JavaDocs。 
下面是创建客户端的示例。需需要替换`eyJhbGciOiJSUz…`为有效的initial access token 或 bearer token。

```java
String token = "eyJhbGciOiJSUz...";

ClientRepresentation client = new ClientRepresentation();
client.setClientId(CLIENT_ID);

ClientRegistration reg = ClientRegistration.create()
    .url("http://localhost:8080", "myrealm")
    .build();

reg.auth(Auth.token(token));

client = reg.create(client);

String registrationAccessToken = client.getRegistrationAccessToken();
```

## 4.8. Client Registration Policies客户注册政策
> 当前计划是删除客户端注册策略，以支持[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/#_client_policies)中
描述的客户端策略。 客户端策略更加灵活，支持更多用例。

Keycloak目前支持通过客户端注册服务注册新客户端的两种方式。

- 经过身份验证的请求 - 注册新客户端的请求必须包含`Initial Access Token`或`Bearer Token`上述任一。
- 匿名请求 - 注册新客户端的请求根本不需要包含任何Token

匿名客户注册请求是非常强大的功能，但是通常不希望任何人能够注册新的客户端没有任何限制。因此，提供了一种限制谁可以在什么条件下注册新客户的方法`Client Registration Policy SPI`。

在Keycloak管理控制台中，您可以单击`Client Registration`，然后单击`Client Registration Policies SPI`子选项卡。在这里将看到哪些政策默认情况下为匿名请求配置，以及哪些经过身份验证的请求配置的策略。

>匿名请求（没有任何Token的请求）只允许用于创建新客户端（注册）。
所以当新客户端通过匿名请求注册，响应将包含Registration Access 
Token，该Token必须用于特定客户端的读取、更新或删除请求。 但是，
从匿名注册使用此Registration Access Token也将受到匿名政策的约束！
这意味着如有`Trusted Hosts`策略，客户端还需要来自受信任的主机，
不允许禁用`Consent Required`当策略存在`Consent Required`时等情况

目前，有以下策略实现：

- Trusted Hosts Policy

>受信任主机策略 

可以配置受信任主机和受信任域的列表。只能从这些主机或域发送对客户端注册服务的请求。 从某些不受信任的 IP 发送的请求将被拒绝。新注册客户端的 URL 也必须仅使用这些受信任的主机或域。例如，它不会被允许`Redirect URI`指向某个不受信任主机的客户端集。默认情况下，没有任何列入白名单的主机，因此匿名客户端注册实际上被禁用。

- Consent Required Policy

>需要用户同意策略 

新注册的客户端将启用`Consent Allowed`。所以身份验证成功后，将需要用户批准权限（客户端范围），显示用户同意页面。这意味着客户将无法访问任何个人用户的信息或权限，除非用户批准。

- Protocol Mappers Policy

>协议映射器策略

允许配置列入白名单列表的协议映射器实现。如果它包含一些未列入白名单的协议映射器，无法注册新客户端或者进行更新。请注意，此策略也用于经过身份验证的请求，因此即使对于经过身份验证的请求，可以使用协议映射器进行限制。

- Client Scope Policy

>客户端范围策略

允许列入白名单`Client Scopes`，可用于新注册或更新的客户端。 默认情况下没有列入白名单的Scope。默认情况下，只有定义在`Realm Default Client Scopes`白名单的客户端Scopes才会成为默认Scope。

- Full Scope Policy

>全范围策略

  新注册的客户端将禁用`Full Scope Allowed`开关。这意味着它们将没有任何的scope realm角色或其他客户端的客户端角色。

- Max Clients Policy

> 最大客户端数策略 

如果领域中的当前客户端数等于或大于指定的限制，则拒绝注册。匿名注册默认为`200`。

- Client Disabled Policy

>客户端禁用策略

新注册的客户端将被禁用。这意味着管理员需要手动批准并启用所有新注册的客户端。 默认情况下，即使对于匿名注册，也不会使用此策略。

# 5. 使用 CLI 自动注册客户端

客户端注册 CLI 是一种命令行界面 （CLI） 工具，供应用程序开发人员在与 Keycloak 集成时以自助服务方式配置新客户端。它专门设计用于与 Keycloak 客户端注册 REST 端点进行交互。

必须为任何应用程序创建或获取客户端配置才能使用 Keycloak。通常，您为托管在唯一主机名上的每个新应用程序配置新客户端。当应用程序与 Keycloak 交互时，应用程序使用客户端 ID 标识自身，以便 Keycloak 可以提供登录页面、单点登录 （SSO） 会话管理和其他服务。

可以使用客户端注册 CLI 从命令行配置应用程序客户端，并且可以在 shell 脚本中使用它。

要允许特定用户使用`Client Registration CLI Keycloak`,KeyCloak管理员通常使用管理控制台为新用户配置适当的角色，或者配置新的客户端和客户端密钥以授予对客户端注册 REST API 的访问权限。

## 5.1. 使用客户端注册 CLI配置用户

**步骤**

1.	以admin  身份登录管理控制台http://localhost:8080/admin。

2.	选择要管理的realm。

3.	如果要使用现有用户，请选择要编辑的用户;否则，请创建新用户。

4.	选择**Role Mappings > Client Roles > realm-management**,如果位于master realm，请选择**NAME-realm**，其中`NAME`是目标realm的名称。可以向master realm中的用户授予对任何其他realm的访问权限。

5.	选择**Available Roles > manage-client**以授予完整的客户端管理权限集。另一种选择是选择**view-clients**对只读或**create-client**对创建新客户端。

> 这些权限授予用户在不使用Initial Access Token 或者 
Registration Access Token的情况下执行操作的能力。

可以不向用户分配任何`realm-management`角色。在这种情况下，用户仍然可以使用客户端注册 CLI 登录，但没有初始访问令牌就无法使用它。尝试在没有令牌的情况下执行任何操作都会导致**403 Forbidden**错误。

管理员可以从管理控制台通过**Realm Settings > Client Registration > Initial Access Token**。

## 5.2. 使用客户端注册CLI配置客户端

默认情况下，服务器将客户端注册 CLI 识别为`admin-cli`客户端，该客户端是为每个新realm自动配置的。使用用户名登录时，无需进行其他客户端配置

**步骤**

1.	如果要对客户端注册 CLI 使用单独的客户端配置，请创建客户端（例如`reg-cli`）。

2.	将**Standard Flow Enabled**设置为**关闭**。

3.	通过配置客户端`Access Type` 为`Confidential`并选择**Credentials > ClientId and Secret**来增强安全性。

>可以在**Credentials**选项卡下配置任一
`Client Id and SecretSigned`或`Signed JWT` 

4.	如果要使用与客户端关联的服务帐户，请启用服务帐户，方法是在`Admin Console` 中**Client**部分中选择要编辑的Clients。

a.	在**Settings**下，将**Access Type**更改为**Confidential**，将**service Accounts Enabled**设置切换为**On**，然后单击**Save**。
b.	单击**Service Account Roles**，然后选择所需的角色以配置服务帐户的访问权限。有关要选择的角色的详细信息，请参阅使用客户端注册 CLI配置用户。

5.	如果要使用常规用户帐户而不是服务帐户，请将**Direct Access Grants Enabled**设置为**On**。

6.	如果客户端配置为`Confidential`，则在运行`kcreg config credentials`时使用`--secret`选项提供配置的secret。

7.	`clientId`指定运行`kcreg config credentials`时要使用客户端（例如`--client reg-cli`）。

8.	启用服务帐户后，可以在运行`kcreg config credentials`时省略指定用户，而仅提供客户端密钥或密钥库信息。

## 5.3. 安装客户端注册 CLI

客户端注册 CLI 集成在 Keycloak Server 发行版中。可以在`bin`目录中找到执行脚本。调用 Linux 脚本使用`kcreg.sh`，调用 Windows 脚本使用`kcreg.bat`。

在设置客户端以便从文件系统上的任何位置使用时，将 Keycloak 服务器目录添加到`PATH`位置。

例如，在：

- Linux：

```bash
$ export PATH=$PATH:$KEYCLOAK_HOME/bin
$ kcreg.sh
```

- Windows：

```cmd
c:\> set PATH=%PATH%;%KEYCLOAK_HOME%\bin
c:\> kcreg
```

`KEYCLOAK_HOME`指解压的Keycloak Server 发行版的目录。

## 5.4. 使用客户端注册 CLI

**步骤**

1.	通过使用凭据登录来启动经过身份验证的会话。

2.	在`Client Registration REST`endpoint上运行命令。
例如，在：

- Linux：

```bash
$ kcreg.sh config credentials --server http://localhost:8080 --realm demo --user user --client reg-cli
$ kcreg.sh create -s clientId=my_client -s 'redirectUris=["http://localhost:8980/myapp/*"]'
$ kcreg.sh get my_client
```

- Windows：

```cmd

c:\> kcreg config credentials --server http://localhost:8080 --realm demo --user user --client reg-cli
c:\> kcreg create -s clientId=my_client -s "redirectUris=[\"http://localhost:8980/myapp/*\"]"
c:\> kcreg get my_client
```

>在生产环境中，必须使用`https: `访问Keycloak 以避免将Token暴露。

3.	如果服务器的证书不是由 Java 的缺省证书信任库中包含的受信任证书颁发机构 （CA） 之一颁发的，请准备`truststore.jks`文件并指示客户端注册 CLI 使用它。

例如，在：

-	Linux：

```bash
$ kcreg.sh config truststore --trustpass $PASSWORD ~/.keycloak/truststore.jks
```

- Windows：

```cmd
c:\> kcreg config truststore --trustpass %PASSWORD% %HOMEPATH%\.keycloak\truststore.jks
```

### 5.4.1. 登录

**步骤**

1.	使用客户端注册 CLI 登录时指定服务器endpoint URL 和realm。

2.	指定用户名或客户端 ID，这将导致使用特殊服务帐户。使用用户名时，必须使用指定用户的密码。使用客户端 ID 时，请使用客户端密钥或`Signed JWT`代替密码。

无论登录方法如何，登录的帐户都需要适当的权限才能执行客户端注册操作。请记住，非master realm中的任何帐户都只能具有管理同一域中的客户端的权限。如果需要管理不同的领域，可以在不同的领域配置多个用户，也可以在master中创建单个用户并添加用于管理不同领域中的客户端的角色。

无法使用客户端注册 CLI 配置用户。使用管理控制台 Web 界面或管理客户端 CLI 配置用户。有关更多详细信息，请参阅[《服务器管理指南》](https://www.keycloak.org/docs/latest/server_admin/)。

`kcreg`成功登录后，它将接收access token并将其保存在专用配置文件中，以便token可用于后续调用。有关配置文件的详细信息，请参阅使用[备用配置](https://www.keycloak.org/docs/latest/securing_apps/index.html#_working_with_alternative_configurations)。

有关使用客户端注册 CLI 的详细信息，请参阅内置帮助。
例如，在：

-	Linux：

```bash
		$ kcreg.sh help
```

-	Windows：

```cmd	
    c:\> kcreg help
```

有关启动经过身份验证的会话的详细信息，请参阅`kcreg config credentials --help`。

### 5.4.2. 使用替代配置

默认情况下，客户端注册 CLI 会自动在用户主目录下的默认位置`./.keycloak/kcreg.config`维护配置文件。可以使用`--config`选项指向其他文件或位置，以并行维护多个经过身份验证的会话。这是从单个线程执行绑定到单个配置文件的操作的最安全方法。
> 不要使配置文件对系统上的其他用户可见,配置文件包含应保持私有的访问令牌和secrets。

如果希望通过对所有命令使用`--no-configkcreg`选项来避免将secrets存储在配置文件中，可能不太方便并且需要更多Token请求才能执行此操作，但这样可以指定每个`kcreg`调用的身份验证信息。

### 5.4.3. Initial Access 和 Registration Access Tokens

对于未在要使用的 Keycloak 服务器上配置帐户的开发人员但想使用客户端注册 CLI，需要realm管理员向开发人员颁发Initial Access Token。由Realm管理员决定如何以及何时颁发和分发这些Token。Realm管理员可以限制Initial Access Token的最长期限以及可以使用它创建的客户端总数。

开发人员拥有Initial Access Token后，可以使用它创建新客户端，而无需进行`kcreg config credential`身份验证。Initial Access Token可以存储在配置文件中，也可以指定为`kcreg create`命令的一部分。
例如，在：

- Linux：

```bash

	$ kcreg.sh config initial-token $TOKEN
	$ kcreg.sh create -s clientId=myclient
```

或

```bash
	$ kcreg.sh create -s clientId=myclient -t $TOKEN
```

- Windows：

```cmd
	c:\> kcreg config initial-token %TOKEN%
	c:\> kcreg create -s clientId=myclient
```

或

```cmd
	c:\> kcreg create -s clientId=myclient -t %TOKEN%
```

使用Initial Access Token时，服务器响应包括新颁发的Registration Access Token。该客户端的任何后续操作都需要通过使用该令牌进行身份验证来执行，该令牌仅对该客户端有效。
客户端注册 CLI 自动使用其专用配置文件来保存此令牌并将其用于其关联的客户端。只要对所有客户端操作使用相同的配置文件，开发人员就无需进行身份验证即可读取、更新或删除以这种方式创建的客户端。

有关Initial Access 和 Registration Access Tokens的详细信息，请参阅客户端注册。

运行`kcreg config initial-token --help`和`kcreg config registration-token --help`命令以获取有关如何使用客户端注册 CLI 配置Token的详细信息。

### 5.4.4. 创建客户端配置

使用凭据进行身份验证或配置Initial Access Token后的第一个任务通常是创建新客户端。通常，可能希望使用准备好的 JSON 文件作为模板，并设置或覆盖某些属性。

以下示例演示如何在成功创建后读取 JSON 文件、覆盖它可能包含的任何客户端 ID、设置任何其他属性以及将配置打印到标准输出。

-	Linux：

```bash
$ kcreg.sh create -f client-template.json -s clientId=myclient -s baseUrl=/myclient -s 'redirectUris=["/myclient/*"]' -o
```

-	Windows：

```cmd
C:\> kcreg create -f client-template.json -s clientId=myclient -s baseUrl=/myclient -s "redirectUris=[\"/myclient/*\"]" -o
```

运行`kcreg create --help`获取有关`kcreg create`命令的详细信息。

`kcreg attrs`可以使用列出可用属性。请记住，不会检查许多配置属性的有效性或一致性。由指定适当的值。请记住， 模板中id 字段中不应有任何 id 字段，并且不应将它们指定为`kcreg create`命令的参数。

### 5.4.5. 检索客户端配置

可以使用`kcreg get`

命令检索现有客户端。
例如，在：

-	Linux：

```bash
	$ kcreg.sh get myclient
```

-	Windows：

```cmd
	C:\> kcreg get myclient
```

还可以将客户端配置作为适配器配置文件检索，该文件可以与 Web 应用程序一起打包。

例如，在：

-	Linux：

```bash
	$ kcreg.sh get myclient -e install > keycloak.json\
```
-	Windows：

```cmd
	C:\> kcreg get myclient -e install > keycloak.json
```

运行`kcreg get --help`命令以获取有关`kcreg get`命令的详细信息。

### 5.4.6. 修改客户端配置

有两种方法可用于更新客户端配置。

一种方法是在获取当前配置后向服务器提交完整的新状态，将其保存到文件，对其进行编辑，然后将其发布回服务器。

例如，在：

-	Linux：
```bash
	$ kcreg.sh get myclient > myclient.json
	$ vi myclient.json
	$ kcreg.sh update myclient -f myclient.json
```
-	Windows：
```cmd
    C:\> kcreg get myclient > myclient.json
	C:\> notepad myclient.json
	C:\> kcreg update myclient -f myclient.json
```
第二种方法获取当前客户端，设置或删除其上的字段，然后一步将其提交回去。
例如，在：
-	Linux：
```bash
	$ kcreg.sh update myclient -s enabled=false -d redirectUris
```
-	Windows：
```cmd
C:\> kcreg update myclient -s enabled=false -d redirectUris
```
还可以使用仅包含要应用的更改的文件，这样就不必将太多值指定为参数。在这种情况下，请指定`--merge`告诉客户端注册 CLI，它不应将 JSON 文件视为完整的新配置，而应将其视为要应用于现有配置的一组属性。

例如，在：

-	Linux：
```bash
$ kcreg.sh update myclient --merge -d redirectUris -f mychanges.json
```
-	Windows：
```cmd
C:\> kcreg update myclient --merge -d redirectUris -f mychanges.json

```
运行`kcreg update --help`命令以获取有关`kcreg update`命令的详细信息。

### 5.4.7. 删除客户端配置
使用以下示例删除客户端。
-	Linux：
```bash
	$ kcreg.sh delete myclient
```
-	Windows：
```cmd	
C:\> kcreg delete myclient
```
运行`kcreg delete --help`命令以获取有关`kcreg delete`命令的详细信息。

### 5.4.8. 刷新无效的Registration Access Tokens

使用`--no-config`模式执行创建、读取、更新和删除 （CRUD） 操作时，客户端注册 CLI 无法为处理Registration Access Tokens。在这种情况下，可能会丢失对客户端最近颁发的Registration Access Tokens的跟踪，这使得如果不使用具有`manage-clients`权限的帐户进行身份验证，则无法在该客户端上执行任何进一步的 CRUD 操作。

如果具有权限，则可以为客户端颁发新的Registration Access Tokens，并将其打印到标准输出或保存到所选的配置文件中。否则，必须要求Realm管理员为该客户端颁发新的Registration Access Tokens。然后，可以通过`--token`选项将其传递给任何 CRUD 命令。还可以使用`kcreg config registration-token`命令将新保存在配置文件中，并让客户端注册 CLI 自动处理。

运行`kcreg update-token --help`命令以获取有关`kcreg update-token`命令的详细信息

5.5. 故障排除
•	问：登录时，出现错误： **Parameter client_assertion_type is missing [invalid_client].**
答：此错误表示客户端配置了`Signed JWT token  credentials`，这意味着必须在登录时使用`--keystore`参数。
