---
coverY: 0
---

# 🐍 Viper

<figure><img src="../.gitbook/assets/viper-logo (1).png" alt=""><figcaption><p>Viper logo</p></figcaption></figure>

## Viper nedir?

Viper, [12-Factor uygulamaları](https://12factor.net/) da dahil olmak üzere Go uygulamaları için eksiksiz bir yapılandırma çözümüdür. Bir uygulama içinde çalışmak üzere tasarlanmıştır. Her türlü yapılandırma gereksinimini ve biçimini karşılayabilir.

Desteklediği yöntemler şunlardır:

* varsayılanları ayarlama,
* JSON, TOML, YAML, HCL, envfile ve Java properties config dosyalarından okuma,
* yapılandırma dosyalarını canlı izleme ve yeniden okuma (opsiyonel),
* ortam değişkenlerinden okuma,
* uzak yapılandırma sistemlerinden (etcd ya da Consul) okuma ve canlı izleme,
* komut-satırı flag'lerinden okuma,
* buffer'dan okuma,
* açık değerler atama.

Viper, tüm uygulama yapılandırma ihtiyaçlarınız için bir kayıt defteri olarak düşünülebilir.

## Nasıl kullanılır?

Bu kısımda, `json` tipinde bir yapılandırma dosyası üzerinden, yapılandırmamızı nasıl yönetebileceğimizi `(okuma, yazma...)` göreceğiz.



Öncelikle projemizi oluşturalım.

```
go mod init <proje>
```

daha sonra ihtiyacımız olduğu için `main.go` ve `config.json` isimli dosyalarımızı oluşturalım. Sonuç olarak projemizin içeriği aşağıdaki gibi olacak.

{% code title="$ tree ." %}
```
.
├── config.json
├── go.mod
├── go.sum
└── main.go
```
{% endcode %}

#### Viper paketini kuralım

```
go get github.com/spf13/viper
```

`config.json` dosyamızda aşağıdaki gibi bir yapı oluşturalım.

{% code title="config.json" %}
```json
{
  "host": "127.0.0.1",
  "port": "80"
}
```
{% endcode %}

Artık `config.json` dosyamızı `host` ve `port` değerlerini okuyup yazmak için kullanabiliriz.

`main.go` dosyamızın içeriği de aşağıdaki gibi olsun.

{% code title="main.go" %}
```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

func main() {
	vp := viper.New() // yeni bir viper örneği oluşturalım

	vp.AddConfigPath(".")      // config dosyamızın bulunduğu dizin
	vp.SetConfigName("config") // config dosyamızın ismi
	vp.SetConfigType("json")   // config dosyamızın uzantısı

	if err := vp.ReadInConfig(); err != nil {
		log.Fatalf("yapılandırma dosyası okunurken hata oluştu: %v", err)
	}
}
```
{% endcode %}

Yukarıdaki yöntem ile oluşturduğumuz yapılandırma dosyasının içeriğini artık yönetebiliriz.

Hadi nasıl okuyacağımıza bakalım.

```go
vp.Get("host") // 127.0.0.1
```

`Get()` fonksiyonu ile belirli bir anahtarın değerini okuyabiliriz. Burada dikkat edilmesi gereken nokta `Get()` fonksiyonu bize `any` tipinde bir değer döndürür. Döndürülen bu değeri asıl tipine çevirmeden kullanamayacağımız durumlar olabilir. Bu durumlarda **type assertion** yaparak değeri çıkartabiliriz ;fakat daha kolay bir yöntem olarak `GetString()` fonksiyonunu kullanabiliriz

```go
vp.GetString("host") // 127.0.0.1
```

Tabi ki bu yöntem sadece `string` tipi için geçerli değil, hepsine tek tek değinmek uzun süreceği için direkt olarak dönüştürebileceğimiz tiplere kısa değinelim.

```go
bool

string, []string, map[string]interface{}, map[string]string{}, map[string][]string{}

int, int32, int64, []int

uint, uint16, uint32, uint64

float64

time.Time, time.Duration
```

Yukarıda verilen tipler için ilgili fonksiyonu `Get<tip-ismi>()` yazarak bulabilirsiniz. Bu şekilde kullanamadığınız tipleri de **type assertion** yaparak dönüştürebilirsiniz.



Şimdi de yapılandırma dosyamızdaki bir anahtara nasıl atama yapacağımıza bakalım.

```go
vp.Set("host", "example.com") // atama işlemi

// değişiklikleri yapılandırma dosyasına yazdıralım
if err := vp.WriteConfig(); err != nil {
    log.Fatalf("yapılandırma dosyası yazılırken hata oluştu: %v", err)
}
```

Yazdırma işleminde sonra `config.json` dosyamız aşağıdaki gibi değişecektir.

{% code title="config.json" %}
```json
{
  "host": "example.com",
  "port": "80"
}
```
{% endcode %}

Atama işlemini eğer var olmayan bir anahtar ile yapsaydık, yeni bir alan oluştururduk. Örnek:

```go
vp.Set("user", "kaan")
```

Yapılandırma dosyamızdaki değişikliğe bakalım.

{% code title="config.json" %}
```json
{
  "host": "example.com",
  "port": "80",
  "user": "kaan"
}
```
{% endcode %}

{% hint style="info" %}
Anahtar değerinin boş olarak atanması veya silinmesi gibi işlemler uygulamanın kararsız çalışmasına neden olabileceği için bu tür fonksiyonların kullanımını engellemişler. Zaten anahtarın silinmesi için bir fonksiyon bulunmamaktadır. Bu yüzden viper paketinin kullanımı sadece `Set` ve `Get` işlemlerini destekler.
{% endhint %}

`WriteConfig()` fonksiyonu dosyanın yazılmasında karşılaşılan hataları döndürür.

### Yapılandırma dosyasını  ile oluşturma

Yapılandırma dosyasının uygulamamız tarafından oluşturulmasını istediğimiz durumlar olabilir. Bu durumlarda, yukarıdaki örneklerimizde gördüğümüzün aksine yapılandırma dosyamızı okumadan önce oluşturmamız gerekir.

{% code title="main.go" %}
```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

func main() {
	vp := viper.New() // yeni bir viper örneği oluşturalım

	vp.AddConfigPath(".")      // config dosyamızın bulunduğu dizin
	vp.SetConfigName("config") // config dosyamızın ismi
	vp.SetConfigType("json")   // config dosyamızın uzantısı

	vp.Set("host", "example.com")
	vp.Set("port", "80")

	// değişiklikleri oluşturmak istediğimiz yapılandırma dosyasına yazdıralım
	if err := vp.WriteConfig(); err != nil {
		log.Fatalf("yapılandırma dosyası yazılırken hata oluştu: %v", err)
	}
}
```
{% endcode %}

`WriteConfig()` fonksiyonunda dikkat edilmesi gereken ayrıntı, eğer oluşturulan yapılandırma dosyası hali hazırda bulunuyorsa bu dosyanın üzerine yazar, fakat üzerine yazma işleminde belirtilmemiş olan anahtarlar eski yapılandırma dosyasındaki hali ile gelir. Yani yapılandırma dosyası tamamen sıfırdan oluşturulmaz.

Eğer yapılandırma dosyamızın oluşturulduktan sonra bir daha değiştirilmemesini ve sadece hali hazırda bulunmadığı durumlarda oluşturulmasını istersek `SafeWriteConfig()` fonksiyonunu kullanabiliriz. Böylelikle yapılandırma dosyamız zaten oluşturulmuşsa bize hata döndürecektir.

Örnek olarak:

{% code title="main.go" %}
```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

func main() {
	vp := viper.New() // yeni bir viper örneği oluşturalım

	vp.AddConfigPath(".")      // config dosyamızın bulunduğu dizin
	vp.SetConfigName("config") // config dosyamızın ismi
	vp.SetConfigType("json")   // config dosyamızın uzantısı

	vp.Set("host", "example.com")
	vp.Set("port", "80")

	// değişiklikleri oluşturmak istediğimiz yapılandırma dosyasına yazdıralım
	if err := vp.SafeWriteConfig(); err != nil {
		log.Fatalf("yapılandırma dosyası yazılırken hata oluştu: %v", err)
	}
}
```
{% endcode %}

`config.json` dosyamız bulunmuyorsa, atanılan değerler ile birlikte yeni bir `config.json` dosyası oluşturulacaktır. Eğer `config.json` dosyamız bulunuyorsa, yukarıdaki işlemler yapıldığında `SafeWriteConfig()` fonksiyonu aşağıdaki gibi bir hata döndürecektir.

{% code title="$ go run ." %}
```
2022/10/06 17:50:56 yapılandırma dosyası yazılırken hata oluştu: Config File "/Volumes/SAMSUNG/main/Dev/go/viper-example/config.json" Already Exists
```
{% endcode %}

Eğer yapılandırma dosyamız iç içe bir yapıdan oluşuyorsa, okuma-yazma işlemlerinde alt-alana ulaşmak için `.` _(nokta)_ kullanabiliriz.

Örnek config.json dosyamız;

{% code title="config.json" %}
```json
{
  "user": {
    "full_name": "Kaan Kuscu",
    "age": 25
  }
}
```
{% endcode %}

Okuma işlemi için,

```go
vp.Get("user.full_name") // Kaan Kuscu
```

Yazma işlemi de aynı şekilde,

```go
vp.Set("user.full_name") // Kaan Kuscu
```

### Ortam Değişkenleri ile kullanımı

Uygulamayı çalıştırdığımız sistemimizdeki ortam değişkenlerine erişmek istediğimizde, başvurabileceğimiz iki farklı yöntem var.

Bu yöntemlerden ilki kullanmak istediğimiz ortam değişkenini viper'a bildirmek. Örneğin `TEST` isminde bir ortam değişkenimiz olsun ve değeri de `abc` olsun. `TEST`'in değerini okuyabilmek için aşağıdaki yöntemleri kullanabiliriz.

Eğer ortam değişkeninin zorunlu olarak bulunması gerekmiyorsa,

```go
if err := vp.BindEnv("TEST"); err != nil {
   log.Fatalln(err)
}

fmt.Println(vp.Get("TEST"))
```

Sisteminizde `TEST` isimli bir ortam değişkeni bulunmuyorsa, aşağıdaki gibi deneyebilirsiniz.

{% code title="$ TEST="abc" go run ." %}
```
abc
```
{% endcode %}

Eğer ortam değişkeni zorunlu olarak bulunması gerekiyorsa,

