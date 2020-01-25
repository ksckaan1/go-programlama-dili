# Gobot ile Arduino Yanıp-Sönen LED Yapımı

Bu yazımda sizlere Golang için Robotik kütüphanesi olan **Gobot**‘tan bir örnek göstereceğim. Bu örneğimizde Arduino’da yanıp sönen LED yapacağız.  
İlk olarak Gobot kütüphanesini indiriyoruz.

> go get -d -u gobot.io/x/gobot/...

Daha sonra Arduino’muzla iletişim kurabilmemiz için **Gort**‘u yüklememiz gerekiyor.  
[https://gort.io/documentation/getting\_started/downloads/](https://gort.io/documentation/getting_started/downloads/)  
Bu örnekte **Arduino Uno** kullanacağız. Arduino’muzun bilgisayarımıza bağlıyoruz ve hangi porta bağlı olduğunu öğrenmek için komut satırına aşağıdakileri yazıyoruz.

> gort scan serial

Windows’ta **&lt;COM\*&gt;** benzeri, Linux’ta ise **/dev/ttyUSB\*** benzeri bir çıktı verecektir. Bu bizim Arduino’muzun bağlı olduğu portu gösteriyor.  
Aşağıdaki kodlar yanıp sönen LED için yazılmıştır. Kodları gördükten sonra açıklamasını yapacağım.

```go
package main
import (
        "time"
        "gobot.io/x/gobot"
        "gobot.io/x/gobot/drivers/gpio"
        "gobot.io/x/gobot/platforms/firmata"
)
func main() {
        firmataAdaptor := firmata.NewAdaptor("/dev/ttyUSB0")
        led := gpio.NewLedDriver(firmataAdaptor, "13")
        work := func() {
                gobot.Every(2*time.Second, func() {
                        led.Toggle()
                })
        }
        robot := gobot.NewRobot("bot",
                []gobot.Connection{firmataAdaptor},
                []gobot.Device{led},
                work,
        )
        robot.Start()
}
```

Açıklamasına gelirsek;  
Gobot ile alakalı kütüphanelerimizi ekliyoruz. **firmataAdaptor** değişkenimizde Arduino’muzun portunu yazıyoruz. Ben Linux kullandığım için Linux’taki portunu yazdım. **led** değişkenimizde ledimizin **13**. dijital pinde yer aldığını belirttik. Yani LED’imizin artı ucunu **13. pine** eksi ucunu ise **GND** \(Ground-Toprak-Nötr\) girişine bağlayacağız.

Sıra geldi çalışma fonksiyonumuz olan **work**‘e. **work** değişkenine anonim bir fonksiyon tanımladık. Bu fonksiyonda **led.Toggle\(\)** fonksiyonu ile her **2** saniyede yanıp-sönmesini ayarladık. En sondaki **robot** değişkeninde ise firmataAdaptor değişkenimizdeki Arduino portuyla bağlantı kurmasını ve hemen altında **led** değişkenini cihaz olarak tanıttık. Son olarak **work** değişkenindeki olayları gerçekleştirip, **robot.Start\(\)** fonksiyonu ile çalışmasını sağladık.  
Yukarıda gördüğünüz üzere **Firmata** kelimesini kullandık. Firmata bizim Arduino cihazımız ile iletişimde bulunabilmemizi sağlayan bir yazılım. Yukarıdaki kodlarımızın çalışması için Arduino’muz içerisine Firmata yazılımını yüklememiz gerekir. Onu da yüklemesi aşağıdaki gibi çok kolay bir işlem.

> gort arduino upload firmata /dev/ttyUSB0

**/dev/ttyUSB0** yerine kendi Arduino portunuzu yazmayı unutmayın.  
Uygulamamızı başlatmak için ise aşağıdakileri yazıyoruz.

> go run main.go

**main.go** yerine ne isim verdiyseniz onu yazınız.

