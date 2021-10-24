# Zamanlayıcılar (Tickers)

Golang’de **zamanlayıcılar**, belirli sürede bir tekrar etme işlemi için kullanılır. Zamanlayıcılar programın çalışma süresince veya durdurulana kadar çalışabilir. Örneğimizi görelim:

```go
package main
import (
	"fmt"
	"time"
)
func main() {
	tekrar := time.NewTicker(500 * time.Millisecond) // her yarım saniyede 1
	bitti := make(chan bool)
	go func() {
		for {
			select {
			case <-bitti:
				return
			case zaman := <-tekrar.C:
				fmt.Println("Tekrar zamanı:", zaman)
			}
		}
	}()
	time.Sleep(1600 * time.Millisecond) // 1,6 saniye programı uyut
	tekrar.Stop()                       // Durdurduk
	bitti <- true                       // for döngüsünü sonlandırdık.
	fmt.Println("Tekrarlayıcı durdu!")
}
```

Açıklaması şöyledir:\
&#x20;\
**tekrar** adında bir zamanlayıcı oluşturduk ve bu zamanlayıcının özelliği her **yarım saniyede bir** tetiklenmesi.\
&#x20;\
**bitti** adında, boolean değer taşıyan bir kanal oluşturduk. Bu kanalın mantığı ileride anlayacaksınız.\
&#x20;\
Anonim Goroutine fonksiyonunun içine, yani **go func()**, sınırsız döngü çeviren bir **for** oluşturduk. Bu döngünün içerisinde **select** ile kanal iletişimlerimizi dinledik. Döngümüzün sonlanması için **bitti** kanalına herhangi bir veri gelmesi gerekiyor. Aşağısındaki **case**‘de zaman değişkenimize tekrar zamanlayıcımız tetiklendikçe bu durum çalışacak. (tekrar.C ile zaman bilgisini alıyoruz.) Yani yarım saniyede bir zaman kanalına veri gelecek.\
&#x20;\
Anonim Goroutine fonksiyonu, **main()** fonksiyonundan ayrı olarak çalıştığından bu fonksiyonumuzun çalışması için ona zaman aralığı vermemiz gerekiyor. **time.Sleep(1600 \* time.Millisecond)** ile **main()** fonksiyonumuzu 1,6 saniye bekletiyoruz. Bu bekleme süresi içinde tekrar zamanlayıcımız 3 kere tetikleniyor. (500 \* x < 1600  | x = 3) Haliyle de 3 kere ekrana çıktımızı bastırıyor. 1,6 saniye geçtikten sonra tekrar zamanlayımızı **tekrar.Stop()** ile durduruyoruz.\
&#x20;\
**bitti** kanalına değer yollayarak, yukarıdaki **for** döngümüzü **return** ile sonlandırmış oluyoruz.\
&#x20;\
Ve en son ekranımıza **“Tekrarlayıcı durdu!”** yazımızı bastırıyoruz.\
Çıktımız aşağıdaki gibi olacaktır:

> Tekrar zamanı: 2019-10-15 14:08:02.002909142 +0300 +03 m=+0.500235484\
> Tekrar zamanı: 2019-10-15 14:08:02.502993622 +0300 +03 m=+1.000319851\
> Tekrar zamanı: 2019-10-15 14:08:03.002952074 +0300 +03 m=+1.500278387\
> Tekrarlayıcı durdu!
