# Kalıtım

Bu yazımda sizlere Golang’ta Katılımı anlatacağım. Programlama dillerine aşina olan arkadaşlarımız bilir, inheritance olayı vardır. Bu olay bir class’taki verileri başka bir class’ta kullanmaya yarar. İşin garip yani Golang’ta ne inheritance vardır, ne de class Class’a benzer struct metodlar vardır. Tabiki kalıtım yapmanın bir başka olayı var Golang’ta, struct’ımıza değişken tanıtıyorken en üste kalıtım istediğimiz struct’ı yazabiliriz.

```go
type insan struct {
    boy, yas, kilo int
}
type ogrenci struct {
    insan
    sinif int
}
```

Yukarıdaki işlem ile **ogrenci** struct’ının başına **insan** ekleyerek **insan** struct’ındaki verileri almasını sağladık. Böylece kalıtım \(miras\) işlemini yapabildik. Yukarıdakileri örnekte kullanalım.

```go
func main() {
    ali:= insan{}
    ali.boy=175
    ali.kilo=73
    ali.yas=22
    fmt.Println(ali.boy, ali.kilo, ali.yas) //175 73 22
    veli:= ogrenci{}
    veli.boy=170
    veli.yas=18
    veli.kilo=70
    veli.sinif=12
    fmt.Println(veli.boy, veli.kilo, veli.yas, veli.sinif) //170 70 18 12
}
```

