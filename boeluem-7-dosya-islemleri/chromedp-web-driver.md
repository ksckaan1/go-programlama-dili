# chromedp \(Web Driver\)

**Chromedp** paketi, harici bağımlılıklar \(Selenium veya PhantomJS gibi\) olmadan Go'da **Chrome DevTools Protokolü**nü destekleyen tarayıcıları çalıştırmanın daha hızlı ve daha basit bir yoludur. Harici bağımlılık yoktur derken, tabi ki sisteminizde Google Chrome'un yüklü olması gerekiyor. Chromedp'ye headless modu gerektiği için minimum Chrome sürümünüz 59 olması gerekiyor.

#### Paketi yüklemek için:

> go get -u github.com/chromedp/chromedp

## Örnek.1

```go
package main

import (
	"context"
	"log"

	"github.com/chromedp/chromedp"
)

func main() {
	//chrome örneği oluşturalım
	ctx, cancel := chromedp.NewExecAllocator(
		context.Background(),
		append(
			chromedp.DefaultExecAllocatorOptions[:],
			chromedp.Flag("headless", false),
		)...,
	)
	//headless: false ayarlayarak pencerenin görünmesini istedik
	
	//chrome nesnesini defer ile kapatmayı unutmuyoruz
	defer cancel()

	//yeni durum oluşturuyoruz
	ctx, cancel = chromedp.NewContext(ctx)

	//aynı şekilde defer ile penceremizide kapatıyoruz
	defer cancel()

	//Twitter isminin kaydedileceği değişkeni oluşturalım
	var twitterName string

	//chromedp.Run() içerisinde tarayıcıda yapılacak işlemleri yazıyoruz.
	err := chromedp.Run(ctx, //önce durumu (hangi pencere) olacağını belirtiyoruz

		//tarayıcının gitmsini istediğimiz adresi yazalım
		chromedp.Navigate(`https://kaanksc.com/posts/webview-statik-uygulama-ornegi3/`),
		
		//css seçici ile belirttiğimiz elementin yüklenmesini bekleyelim
		chromedp.WaitVisible(`.single__contents > p:nth-child(16) > a:nth-child(1)`, chromedp.ByQuery),
		
		//Tıklanılacak nesneyi yine css seçici ile belirtelim
		chromedp.Click(`.single__contents > p:nth-child(16) > a:nth-child(1)`, chromedp.ByQuery),
		//Bu işlemden sonra twitter'a gidecek

		//Twitter profilinde adın gösterildiği yeri css seçici ile beklemesini istedik
		chromedp.WaitVisible(`div.r-1b6yd1w:nth-child(1) > span:nth-child(1)`, chromedp.ByQuery),

		//belirttiğimiz css seçicisi ile elementin içindeki yazıyı twitterName değişkenine atayalım
		chromedp.Text(`div.r-1b6yd1w:nth-child(1) > span:nth-child(1)`, &twitterName),

		//burdan sonra tarayıcı penceresi kapanacak
	)

	//hata kontrolü yapaım
	if err != nil {
		log.Fatal(err)
	}

	//son olarak twitterName içindeki değişkeni ekrana bastıralım
	log.Printf("Twitter İsim:%s\n", twitterName)
}

```

Yukarıdaki örnekte yeni chrome penceresi oluşturma, tıklama, elementin yüklenmesini bekleme, element içindeki yazıyı alma ve adrese gitme gibi işlemlerin nasıl yapıldığını gördük.

## Örnek.2

Go Playground linkinden Go kodlarını çeken bir uygulama yazalım.

```go
package main

import (
	"context"
	"log"

	"github.com/chromedp/chromedp"
)

func main() {
	//chrome örneği oluşturalım
	ctx, cancel := chromedp.NewExecAllocator(
		context.Background(),
		append(
			chromedp.DefaultExecAllocatorOptions[:],
			chromedp.Flag("headless", true), //Bu sefer headless çalışmasını istedik
			//yani chrome pecneresi açılmayacak
		)...,
	)

	//chrome nesnesini defer ile kapatmayı unutmuyoruz
	defer cancel()

	//yeni durum oluşturuyoruz
	ctx, cancel = chromedp.NewContext(ctx)

	//aynı şekilde defer ile penceremizide kapatıyoruz
	defer cancel()

	//go Kodlarının kaydedileceği değişkeni oluşturalım
	var goKodu string

	//chromedp.Run() içerisinde tarayıcıda yapılacak işlemleri yazıyoruz.
	err := chromedp.Run(ctx, //önce durumu (hangi pencere) olacağını belirtiyoruz

		//tarayıcının gitmsini istediğimiz adresi yazalım
		chromedp.Navigate(`https://play.golang.org/p/a_SoTzENmV7`),

		//tarayıcının yüklenemesini bekleyeceği elementi css seçici ile yazıyoruz
		chromedp.WaitVisible(`#code`, chromedp.ByQuery),

		//textContent ile yazı alanı içeriğini çekebiliriz.
		chromedp.TextContent(`#code`, &goKodu, chromedp.ByQuery),
	)

	if err != nil {
		log.Fatal(err)
	}

	//son oalrak go kodlarını ekrana bastıralım
	log.Printf("Go Kodu:\n%s", goKodu)
}

```

Yukarıdaki örnekte headless modda çalışmayı ve yazı kutusu \(input veya textarea\) içindeki yazıları almayı öğrendik.

Daha fazla bilgi için [https://github.com/chromedp/chromedp](https://github.com/chromedp/chromedp),

daha fazla örnek için [https://github.com/chromedp/examples](https://github.com/chromedp/examples) adresine bakabilirsiniz.

