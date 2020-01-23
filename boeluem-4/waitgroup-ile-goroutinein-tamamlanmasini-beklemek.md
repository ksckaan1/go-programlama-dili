# WaitGroup ile Goroutine’in Tamamlanmasını Beklemek

Goroutine’leri Asenkron programlama yaparken kullanırız. Böylece aynı anda birden fazla işlem gerçekleştirebiliriz. Peki programımızın tüm goroutine’leri bekleme gibi bir ihtiyacı olsaydı ne yapmamız gerekirdir. Kodumuzu hemen aşağıda görelim.

```go
package main
import (
    "fmt"
    "sync"
    "time"
)
func main() {
    total := 3
    // total'de kullanılan goroutine'ler için waitgroup oluştur.
    var wg sync.WaitGroup
    wg.Add(total)
    for i := 1; i <= total; i++ {
        // uzun sürecek bir goroutine ortamı oluşturuyoruz
        go uzunsürengoroutine(i, &wg)
    }
    // Tüm goroutine'lerin bitmesini bekliyoruz.
    wg.Wait()
    fmt.Println("Tamamlandı")
}
func uzunsürengoroutine(uyku int, wg *sync.WaitGroup) {
    // waitGroup tamamlanmasını garantiye alıyoruz 
    defer wg.Done()
    time.Sleep(time.Duration(uyku) * time.Second)
    fmt.Println( uyku,"saniye uyku sürüyor")
}
```

