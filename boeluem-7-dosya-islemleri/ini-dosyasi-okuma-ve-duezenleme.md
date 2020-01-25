# ini Dosyası Okuma ve Düzenleme

ini dosyaları programımızın ayarlarını barındırabileceğimiz dosyalardır. Golang’de ini dosyalarını paket ekleyerek yapabiliriz. Paketimizi indirmek için aşağıdaki komutu yazıyoruz.

> go get gopkg.in/ini.v1

Paketimizi indirdikten sonra ini dosyamız üzerinde işlemler yapabiliriz.  
Aşağıdaki örneklerde kullanacağımız ini dosyası bu şekildedir. Dosyamızın ismi **ayarlar.ini** olsun.

```text
# Yorum satırımız
uygulama_modu = geliştirme
[dizinler]
veri = ./dosyalar
[sunucu]
protokol = http
port = 8000
```

**Ini Dosyası Okuma**

Dosya okuma işlemimiz dizin mantığında çalışır. Örneğimizi görelim.

```go
package main
import (
	"fmt"
	"gopkg.in/ini.v1"
)
func kontrol(e error) {
	if e != nil {
		panic(e)
	}
}
func main() {
	veri, err := ini.Load("ayarlar.ini")
	kontrol(err)
	fmt.Println("Uygulama Modu:", veri.Section("").Key("uygulama_modu").String())
	fmt.Println("Veri Dizini:", veri.Section("dizinler").Key("veri").String())
	fmt.Println("Bağlantı Protokolü:", veri.Section("sunucu").Key("protokol").String())
	fmt.Println("Bağlantı Portu:", veri.Section("sunucu").Key("port").MustInt(9999))
}
```

Çıktımız şu şekilde olacaktır.

> Uygulama Modu: geliştirme  
> Veri Dizini: ./dosyalar  
> Bağlantı Protokolü: http  
> Bağlantı Portu: 8000



**Inı Dosyası Düzenleme**

Yine aynı **ayarlar.ini** dosyası üzerinde düzenlemeler yapalım. İşte örneğimiz:

```go
package main
import (
	"gopkg.in/ini.v1"
)
func kontrol(e error) {
	if e != nil {
		panic(e)
	}
}
func main() {
	veri, err := ini.Load("ayarlar.ini")
	kontrol(err)
	// Değer atıyoruz.
	veri.Section("").Key("uygulama_modu").SetValue("ürün")
	// ini dosyamızı kaydetmeyi unutmuyoruz.
	veri.SaveTo("ayarlar.ini")
}
```

