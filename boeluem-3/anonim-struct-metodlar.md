# Anonim Struct Metodlar

Golang’ta tıpkı anonim fonksiyonlar olduğu gibi anonim struct methodlar da oluşturabiliriz. Örneğimizi görelim:

```go
package main
import "fmt"
func main() {
    kişi := struct {
        ad, soyad string
    }{"Kemal", "Atatürk"}
    fmt.Println(kişi)
}
```

Yukarıda struct’ı bir değişken içerisinde tanımladık. Bunu normal struct method olarak yazmaya kalksaydık aşağıdaki gibi yazardık.

```go
package main
import "fmt"
type insan struct {
    ad, soyad string
}
func main() {
    kişi := insan{"Kemal", "Atatürk"}
    fmt.Println(kişi)
}
```

