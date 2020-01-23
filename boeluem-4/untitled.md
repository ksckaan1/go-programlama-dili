# Goroutine

**Goroutine**’ler **Go Runtime** tarafından yönetilen hafif bir sistemdir. Bir işlemi Goroutine ile gerçekleştirmek istiyorsak o satırın başına **go** yazmamız yeterlidir. Şaşırtıcı ama sadece **go** yazarak bu işlemi yapabiliyoruz. Aynı **defer**’deki gibi. Goroutine aslında bir fonksiyon gibi çalışır. Eş zamanlı çalışacak fonksiyonları çağırmak için kullanılır. Basit bir örnek ile anlaşılır bir sonuç elde edelim.

```go
package main
import (
 "fmt"
 "time"
)
func yaz(s string) {
 for i := 0; i < 5; i++ {
  time.Sleep(1000 * time.Millisecond)
  fmt.Println(s)
 }
}
func main() {
 go yaz("Dünya")
 yaz("Merhaba")
}
```

Yazdığımız kodları inceleyelim. Zaman ile alakalı fonksiyonları kullanabilmek için time paketini import ettik. **yaz** fonksiyonu oluşturduk. Bu fonksiyon **s** isminde string tipinde değeri işleyecek. Fonksiyonun bloğunda 5 defa 1 saniye bekleyerek istenilen yazıyı ekrana bastıran kodlarımızı girdik. **main\(\)** fonksiyonumuzda bir tane iki tane **yaz\(\)** fonksiyonu kullandık. Birinin başına go terimini ekledik. Çıktımız şu şekilde olacaktır;

> Merhaba  
> Dünya  
> Merhaba  
> Dünya  
> Dünya  
> Merhaba  
> Merhaba  
> Dünya  
> Dünya  
> Merhaba

Çıktımız ekrana bastırılırken belirlediğimiz zaman beklemesi ile birlikte çıkar. **go** terimini kaldırıp veya erteleme zamanını değiştirerek deneyde bulunabilirsiniz.

