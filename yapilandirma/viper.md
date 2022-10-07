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

`BindEnv()` fonksiyonunun hata döndürmeme şartı sadece en az bir parametre girmemizdir.

### Varsayılan değerleri atama

Yapılandırma dosyaların ve ortam değişkenlerinden okuma yaptığımızda, bazı anahtarlar tanımlı olmadığı için, sıfır-değerli halde gelebilir. Eğer bu istemediğimiz bir durumsa bu anahtarların varsayılan değerlerini ayarlayabiliriz. Örnek;

{% code title="config.json" %}
```json
{
  "host": "localhost",
  "port": "80",
  "user": "root"
}
```
{% endcode %}

Gelelim kullanımına;

```go
if err := vp.ReadInConfig(); err != nil {
	log.Fatalln(err)
}

vp.SetDefault("password", "1234") // anahtar, değer

fmt.Println(vp.GetString("password")) // 1234
```

`config.json` dosyamızda `password` isimli bir alan olmadığı için varsayılan olarak ayarladığımız `1234` değeri yazdırılacaktır.

Eğer varsayılan değerler çok sayıda olacaksa, şöyle bir yöntem kullanabiliriz.

```go
defaults := map[string]any{
	"host":     "localhost",
	"user":     "root",
	"password": "1234",
}
	
for k, v := range defaults {
	vp.Set(k, v)
}
```

### Unmarshal

Buraya kadar olan bölümlerde Viper'ı basitçe nasıl kullanacağımızı gördük. Ölçeklenebilir bir projede sadece bu yöntemleri kullarak ilerlememiz zor olduğu için işimizi kolaylaştıracak başka çözümler gerekiyor. Proje yapımızı düzenli tutmak için, bu yöntemlerimizi daha pratik hale getirmemiz gerekiyor.

Bunun için gruplandırma yaparak, yapılandırma ayarlarımızı `struct` halinde kullanabiliriz.

Örneğin aşağıdaki gibi bir yapılandırma dosyamız olsun.

{% code title="config.json" %}
```json
{
  "api": {
    "host": "example.com",
    "port": "80",
    "ssl": true
  },
  "database": {
    "host": "localhost",
    "user": "root",
    "password": "1234",
    "name": "project"
  }
}
```
{% endcode %}

Yukarıdaki `json` yapısı aktarabileceğimiz `struct`'ları belirleyelim.

```go
type Config struct {
	API      APIConfig      `mapstructure:"api"`
	Database DataBaseConfig `mapstructure:"database"`
}

type APIConfig struct {
	Host string `mapstructure:"host"`
	Port string `mapstructure:"port"`
	SSL  bool   `mapstructure:"ssl"`
}

type DataBaseConfig struct {
	Host     string `mapstructure:"host"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
	Name     string `mapstructure:"name"`
}
```

Yukarıdaki `struct`'larda dikkat edilmesi gereken ayrıntı, `struct tag`'lerdeki `mapstructure` anahtarıdır.

Yapılandırma dosyamızın tipi `json` olduğu için `mapstructure` yerine `json`'da kullanabilirdik. Fakat yapılandırma dosyamızın tipi, örnek olarak `json`'dan `yaml`'a geçseydi, `struct tag`'lerde `yaml` olarak düzenleme yapmamız gerekirdi. Bu yüzden tüm desteklenen yapılandırma dosyası tiplerinde unmarshal yapabilmesi için `mapstructure` olarak uyguladık.

{% hint style="info" %}
Tabi ki bu yöntem her durumda işimizi görmeyebilir. Bazı durumlarda farklı dosya tiplerinde farklı anahtar isimlendirmeleri olabilir. Bu gibi durumlarda da dosya tipine göre `struct tag`'lerini düzenlemekte fayda vardır.
{% endhint %}

`Unmarshal` etmek için aşağıdaki yöntemi izleyebiliriz.

{% code title="main.go" %}
```go
func main() {
	vp := viper.New()

	vp.AddConfigPath(".")
	vp.SetConfigName("config")
	vp.SetConfigType("json")

	// öncelikle yapılandırma dosyasını okumamız gerekiyor
	if err := vp.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}
	
	var configs Config

	if err := vp.Unmarshal(&configs); err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("%+v\n", configs)
}
```
{% endcode %}

Çıktımız aşağıdaki gibi olacaktır.

{% code title="$ go run ." %}
```
{API:{Host:example.com Port:80 SSL:true} Database:{Host:localhost User:root Password:1234 Name:project}}
```
{% endcode %}
