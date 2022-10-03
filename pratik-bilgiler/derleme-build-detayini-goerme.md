# Derleme (Build) Detayını Görme

Golang’de normalde derleme işlemini yapmak için go build komutunu kullanırız. Bu komut terminal ekranından bize sadece bir hata olduğunda bilgi verir. Hata yoksa çalıştırılabilir dosyayı zaten oluşturur.\


**Peki programımızın derlenme esnasında bilgilendirmeyi nasıl görebiliriz?**

İşte aşağıdaki gibi:

> go build -gcflags=-m main.go

Yani build’e ek parametre olarak **-gcflags=-m** yazıyoruz. Nasıl gözüktüğünü örnek olarak görelim.

```go
package main
import (
    "fmt"
    "os"
)
func main() {
        fmt.Println("Merhaba")
    fmt.Println(topla(2,2))
    os.Exit(0)
}
func topla(x,y int) int{
    return x + y
}
```

Yukarıdaki kodumuzun derleme çıktısı şöyle olacaktır.

> command-line-arguments\
> ./main.go:13:6: can inline topla\
> ./main.go:9:13: inlining call to fmt.Println\
> ./main.go:10:22: inlining call to topla\
> ./main.go:10:16: inlining call to fmt.Println\
> ./main.go:9:14: "Merhaba" escapes to heap\
> ./main.go:9:13: io.Writer(os.Stdout) escapes to heap\
> ./main.go:10:16: io.Writer(os.Stdout) escapes to heap\
> ./main.go:10:22: topla(2, 2) escapes to heap\
> ./main.go:9:13: main \[]interface {} literal does not escape\
> ./main.go:10:16: main \[]interface {} literal does not escape\
> :1: os.(\*File).close .this does not escape
