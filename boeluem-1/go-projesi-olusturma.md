# Go Projesi Oluşturma

Go kurulumu ve paket yükleme işlemleri sonrasında oluşan klasör yapısını kullanarak projeleri burada barındırabiliriz. Normalde herhangi bir klasörde Go geliştirmeniz mümkündür fakat Go geliştiricilerin doğru bulduğu klasör mimarisinde geliştirmek size daha sağlıklı bir süreç sağlayabilir.

Varsayılan kurulumda `c:/users/{user-name}/go` klasöründe **bin**, **pkg**, **src** adında üç klasör oluşturulur.

**bin** klasörü paket yöneticisi ile install komutu kullanılarak deploy edilen executable dosyaları barındırır.

**pkg** klasörü üçüncü sınıf paketler indirildiğinde derlenmiş şekilde bu klasör altında barındırır. Aynı zamanda kaynak kodları **src** klasörüne koyar. pkg klasörü derlenme süresini hızlandırmak için halihazırda derlenmiş bir kod içerir. Kendi projelerinizde import ettiğiniz paketlerin geldiği yer burasıdır.

**src** klasörü geliştirme yapacağınız projelerinizin barındırılacağı klasördür. Burada projelerinizi belirli bir düzende barındırmanız sizin için sağlıklı olacaktır. Aşağıdaki gösterilen yapıda projelerinizi geliştirebilirsiniz. Bu yapı sayesinde **Git** üzerinde bulunan projelerinizdeki karışıklığı önleyebilirsiniz.

### Varsayılan GOPATH Klasörünü Değiştirme

**Yeni Yöntem**

**Go modules** sayesinde Go 1.11'den beri artık GOPATH kullanmak zorunda değilsiniz. Aşağıdaki adımı herhangi bir klasörde kullanarak modülünüzü tanımlayabilirsiniz.

```bash
go mod init github.com/{your-user}/{your-repo}
```

* Bu komutla o dizinde bir modül kökü oluşturulur.
* İstediğiniz kadar modül oluşturabilirsiniz.

**Eski Yöntem**

**GOPATH** ile çalışmakta ısrar ediyorsanız aşağıdaki uyarılara dikkat etmelisiniz.

* Go 1.8'den beri, GOPATH veya GOROOT'unuzu ayarlamanız gerekmez.
* GOPATH varsayılan olarak **user/home** dizininizin altındadır.

{% hint style="info" %}
GOPATH ayarlanmadıysa, Unix sistemlerinde $HOME/go ve Windows'ta `%USERPROFILE%\go` olduğu varsayılır. Çalışma alanınız olarak özel bir konum kullanmak istiyorsanız, GOPATH ortam değişkenini ayarlayabilirsiniz.
{% endhint %}

Özel çalışma alanı ayarlamak için aşağıdaki komutları kullanabilirsiniz.

```bash
export GOROOT=/usr/lib/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```
