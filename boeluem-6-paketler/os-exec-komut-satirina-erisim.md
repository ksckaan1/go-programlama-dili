# os/exec (Komut Satırına Erişim)

**os/exec** paketi komut satırına (cmd, powershell, terminal) komut göndermemizi sağlayan Golang ile bütünleşik gelen bir pakettir. Bu paket sayesinde oluşturacağımız programa sistem işlerini yaptırabiliriz. Örnek olarak dosya/klasör taşıma/silme/oluşturma/kopyalama gibi işlemleri yaptırabilir. Daha doğrusu komut satırı/terminal üzerinden yapabildiğimiz her işlemi yaptırabiliriz. Tabi kullandığımız işletim sistemine göre terminal komutları değiştiği için ona göre örnek vermeye çalışacağım.

\
**Örnek 1: Komut Satırına Komut Gönderme**\
Ufak bir örnek ile başlayalım.

```go
package main
import (
    "os"
    "os/exec"
)
func main() {
    cmd := exec.Command("mkdir", "klasörüm")
    cmd.Stdout = os.Stdout
    cmd.Run()
}
```

**“mkdir klasörüm”** komutu programın çalıştırıldığı dizinde **“klasörüm”** adında bir klasör oluşturur. Komut girerken dikkat etmeniz geren çok önemi bir detay var. Yazacağınız komut birden fazla kelimeden oluşuyorsa mutlaka ayrı ayrı girmelisiniz. Eğer **exec.Command()** fonksiyonuna direkt olarak **“mkdir klasörüm”** olarak girseydik, komutu tek kelime olarak algılayacaktı. Yani **string dizisi** mantığında çalışıyor bu olay. Sonuç olarak yukarıdaki gibi basit bir şekilde komut satırına komut yollayabilirsiniz.\
**Örnek 2: Komut Satırına Komut Gönderip Çıktısını Okuma**\
Yukarıda çok kolay bir şekilde komut göndermeyi gördük. Fakat iş komutun çıktısını okumaya gelince işler biraz karışıyor. Yavaştan vaziyetinizi alın  ![Wink](https://i1.wp.com/golangtr.org/forum/images/smilies/wink.png?w=770)\
Aslında korkulacak bir olay yok. Yeter ki mantığını anlayalım. Şimdi yapacağımız işlemleri 4 ana parçaya bölelim.

1. Komutun tanımlanması
2. Çıktı okuyucusunun tanımlanması
3. Komutun başlatılması
4. Komutun çalışması

Hemen kodlarımıza geçelim.

```go
package main
import (
    "bufio"
    "fmt"
    "os"
    "os/exec"
)
func main() {
    //komutun tanımlanması
    cmd := exec.Command("go", "version")
    cmdOkuyucu, hata := cmd.StdoutPipe()
    if hata != nil {
        fmt.Fprintln(os.Stderr, "Çıktı okunurken hata oluştu:", hata)
        os.Exit(1)
    }
    //çıktı okuyucusunun tanımlanması
    çıktı := bufio.NewScanner(cmdOkuyucu)
    go func() {
        for çıktı.Scan() {
            fmt.Println(çıktı.Text())
        }
    }()
    //komutun başlatılması
    hata = cmd.Start()
    if hata != nil {
        fmt.Fprintln(os.Stderr, "Komut başlatılamadı:", hata)
        os.Exit(1)
    }
    //komutun çalışması
    hata = cmd.Wait()
    if hata != nil {
        fmt.Fprintln(os.Stderr, "Komut çalışırken hata oluştu:", hata)
        os.Exit(1)
    }
}
```

Gelelim yukarıdaki kodların açıklamasına…\
**cmd** adında bir değişken oluşturduk. Bu değişkenimiz sayesinde **exec.Command() **fonksiyonuyla komutlarımızı girdik.\
**cmd.StdoutPipe()** fonksiyonuyla gönderdiğimiz komutun çıktılarını alabiliyoruz. **cmdOkuyucu** değişkenine komut çıktımızı aldık. **hata** değişkenimize ise komut girildiğinde oluşan hata mesajını aldık.\
**hata** değişkeninin içi boş değilse ekrana bastırmasını ve **1** numaralı çıkış kodunu vermesini istedik. Bu arada 1 numaralı çıkış kodu hatalar için kullanılır. Golang programlarında görmüyoruz ama **0** numaralı çıkış kod da işler yolunda gittiği zaman kullanılır. C dili kodlayan arkadaşlarımız bilir, **int main** fonksiyonunun sonuna **return 0** ibaresi girilir. Buraya kadar olan işlemlerimiz komutun tanımlanması ile ilgiliydi.\
Çıktımızı okuyabilmemiz için birkaç işlem yapmamız gerekiyor. Ne yazık ki çıktımızı direkt olarak değişkene atayıp ekrana bastıramıyoruz. **çıktı** adında değişkenimizi oluşturuyoruz. Bu değişkenimiz **cmdOkuyucu** değişkenini taramaya yarayacak. Hemen aşağısında goroutine fonksiyonumuzda **çıktı.Scan()** döngüsü ile çıktı sonucumuzu ekrana bastırıyoruz.\
Buraya kadar tanımlamalarımız yapmış bulunduk. Bundan sonra işlemlerimiz komutumuzun çalıştırılması ve sonucun beklenmesi olacak.\
**hata** değişkenimize **cmd.Start()** fonksiyonunu atayarak komut başlatma işleminde hata oluşursa veriyi çekmesini sağladık. Hata var ise **error** tipindeki hata mesajımızı ekrana ve 1 numaralı hatayı ekrana bastıracak.\
Son işlemimiz ise komutun sonuçlanmasının beklenmesi. **hata** değişkenimize **cmd.Wait()** fonksiyonunu ekleyerek bekleme işleminde oluşabilecek hatanın mesajını çekmiş olduk. Aşağısında eğer hata var ise ekrana bastırması için gerekli kodlarımızı girdik. Son olarak **1** numaralı çıkış işlemini yaptık.\
Gördüğünüz gibi çıktı alma işlemi biraz daha uzun. Ama mantığını anladıktan sonra kolay bir işlem olduğunu düşüyorum.\
**Örnek 3: Hata Detayı Çekmeden Komut Çıktısı Alma**\
Eğer ben hata çıktısının detayını almak istemiyorum, benim işim sadece çıktıyla diyorsanız yapacağımız işlemler gerçekten kolaylaşıyor. Hemen kodlarımızı görelim.

```go
package main
import (
    "fmt"
    "log"
    "os/exec"
)
func main() {
    cmd := exec.Command("go", "versison")
    çıktı, hata := cmd.CombinedOutput()
    if hata != nil {
        log.Fatalf("Komut hatası: %s\n", hata)
    }
    fmt.Printf(string(çıktı))
}
```

Kodlarımızın açıklamasına geçelim. **cmd** adında değişkenimizde **exec.Command()** fonksiyonu ile komutlarımızı tanımladık. **çıktı** ve **hata** değişkenimize komut çıktılarımızı aldık. Burada **hata** değişkeni sadece hata numarasını verecektir. Detayları barındırmaz. Eğer hatamız var ise ekrana bastırmasını istedik. Aşağısında ise **çıktı** değişkenimiz **byte dizisi **tipinde olduğu için **string**‘e çevirip ekrana bastırdık.
