# Web Scrapper

Bu yazıda Go dilinde nasıl basitçe web scrapper yapacağımıza bakacağız.

### Web Scrapper Nedir?

Web Scrapper bir web sayfasındaki elementleri işleyen araçtır.

**Örnek uygulama:**

**blog.golang.org** sitesindeki blog başlıklarını listeleyen Go programının yazılması.

```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	blogBasliklari, err := baslikCek("https://blog.golang.org")
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Başlıklar:")
	fmt.Printf(blogBasliklari)
}

// URL adresinden blog başlıklarını çekecek fonksiyon
func baslikCek(url string) (string, error) {

	// HTML'i çek
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}

	// goquery dökümanına çevir
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return "", err
	}

	// liste oluştur
	basliklar := ""
	doc.Find(".title a").Each(func(i int, s *goquery.Selection) {
		basliklar += "- " + s.Text() + "\n"
	})
	return basliklar, nil
}

```

Açıklaması:  
goquery kütüphanesini bilgisayarınıza indiriyoruz.

> go get github.com/PuerkitoBio/goquery

`baslikCek` fonksiyonuna URL adresini girdik. Zaten bu fonksiyonu da bi oluşturduk. Hata kontrolü yaptıktan sonra başlıkları yazdırdık.

`baslikCek` fonksiyonuna baktığımızda;  
İlk önce url adresini, yani içindeki elementleri, çektik. goquery dökümanına çevirdik. Burada dikkat edilmesi gereken nokta, `resp` değişkeni bizim çektiğimiz url adresidir. Daha sonra liste olarak oluşturduk. Liste oluşturma işleminde `.title` sınıfına ait ve `a` etiketinde olan elementleri sıralamasını istedik. Element seçim işlemi jQuery selector mantığında çalışır.

Çıktımız:

{% hint style="info" %}
Başlıklar:

* Announcing the 2019 Go Developer Survey
* Go.dev: a new hub for Go developers
* Go Turns 10
* Go Modules: v2 and Beyond
* Working with Errors in Go 1.13
{% endhint %}

