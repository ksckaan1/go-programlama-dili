# Merhaba Dünya

Programlama dünyasında gelenektir, bir programlama dili öğrenilirken ilk önce ekrana **“Merhaba Dünya”** çıktısı veren bir program yazılır. Biz de geleneği bozmadan Golang üzerinde Merhaba Dünya uygulaması yazalım. İlk önce kodları görelim. Daha sonra açıklamasını görelim.

```go
package main

import “fmt”

func main(){
    fmt.Println(“Merhaba Dünya!”)
}
```

Şimdi yukarıdaki kodlarda neler yaptığımıza gelelim.

**Package**, kod sayfalarımız arasında iletişimde bulunabilmemizi sağlar. Bu sayede içerisinde **package** değeri aynı olan kod sayfaları birbirleriyle iletişim halinde olma yeteneği kazanır. Yukarıdaki örnekte package uygulama olan sayfalar birbiriyle iletişim kurabilir.

**import “fmt”** ile Golang dilinde kullanılan ana işlemler için olan kütüphanemizi içeri aktardık.

**func main()** ise programımızın çalışacağı ana bölümün fonksiyonudur. Yanındaki süslü parantezler { } içine yazdığımız kodlar ile programımızda çeşitli işlemler yapabileceğiz. Derlenmiş bir uygulama ilk olarak **main** fonksiyonuna bakar ve buradaki kodları çalıştırır.

Yukarıda **import** ettiğimiz **fmt** kütüphanesi içinden **Println** fonksiyonu ile ekranımıza **“Merhaba Dünya”** yazısını bastırdık. Gelelim programımızın derlenmesine. Daha önceden programlama dilleriyle geçmişi olmayan arkadaşlarımız için derlenme şöyle anlatılabilir. Yazdığımız Golang dili insanların kolaylıkla programlama yapabilmesi için oluşturulmuş bir dildir.

Ama makine (bilgisayar) bu yazdıklarımızı anlamaz. O yüzden her derlenen dilde olduğu gibi Golang’ın da yazdıklarımızı makinenin anlayacağı makine diline çeviren derleyicisi vardır.

Makinemiz üzerinde çalıştırılabilir bir dosya üretmek için kodlarımızın derlenmesi gereklidir. Vscode üzerinden kodlarımızın derlenip çalışması için **F5** tuşuna basıyoruz. Böylece programımızı test edebiliriz. Eğer vscode üzerinden derliyorsanız yazdığımız kodların hemen altında **DEBUG CONSOLE** bölümünde kodumuzun sonuç çıktısını görebiliriz.

Çıktımızı inceleyecek olursak, **API server listening at :127.0.0.1:44830** ibaresinde gerçekleşen olay, Golang kodlarımızı çalıştırdığımızda oluşturulan **44830** portlu **127.0.0.1** yerel sunucusu (localhost) üzerinden kodlarımızın sürüş testini gerçekleştirdik. Hemen aşağısına da çıktımızı verdi.

Eğer vscode üzerinden değil de, konsol üzerinden yapmak isterseniz, oluşturmuş olduğumuz main.go dosyasının bulunduğu dizin (klasör) içerisinde konsol uygulamamızı açıyoruz. Windows’ta cmd veya Powershell’dir. Unix sistemlerde terminal diye geçer. İki tarafa da yazacağımız komutlar aynıdır. O yüzden hangisinden yazdığınız farketmez.

Kodlarımızı sadece denemek istiyorsak yazacağımız komut::

`go run main.go //main.go yerine .go dosyamızın ismi gelecek`

Eğer çalıştırılabilir bir dosya oluşturmak istiyorsak (Windows’ta .exe)

`go build main.go //main.go yerine .go dosyamızın ismi gelecek`

Böylece bu işlemleri yaptığımız dizin içerisine çalıştırılabilir bir dosya oluşturmuş olduk.

Windows üzerinden konsola **main** yazarak uygulamayı açabilir veya klasörde **main.exe** dosyasına çift tıklayarak uygulamayı çalıştırabilirsiniz.

Linux üzerinden ise terminale derlenmiş main çıktınızın bulunduğu dizinde **./main** yazarak çalıştırabilirsiniz.

Böylece ilk uygulamamızı yazmış olduk. Tabi şu ana kadar görmemiş olduğumuz kodlar gördük. Onların açıklamaları da ileriki bölümlerde olacak. Şimdilik gelenek diye ilk bölümde **Merhaba Dünya** uygulaması yazdık.
