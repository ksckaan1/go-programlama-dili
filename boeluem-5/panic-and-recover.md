# Panic & Recover

**Panic** ve **Recover**, Golang’de hata ayıklama için kullanılan anahtar kelimelerdir. Size bunu daha iyi ve akılda kalıcı anlatmak için teorik anlatım yerine uygulamalı öğretim yapmak istiyorum. Böylece daha akılda kalıcı olur.  
Aşağıda **panic** durumu oluşturan bir örnek göreceğiz:

```go
package main
func main() {
    sayilar := make([]int, 5)
    sayilar[6] = 10
}
```

Yukarıda **make** fonksiyonu ile **sayilar** adında uzunluğu **5** birimden oluşan bir **int** dizi oluşturduk. Bu bildiğimiz sayısal 5 tane değişken tutan bir dizi aslında. Ama altında **sayilar** dizisinin **6**. indeksine **10** değerini atamak istedik. Fakat **sayilar** dizesinin 6. indeksi mantıken bulunmamakta. Bu haldeyken programımız **panic** hatası verecektir ve çıktımız aşağıdaki gibi olacaktır.

> panic: runtime error: index out of range  
> goroutine 1 \[running\]:  
> main.main\(\)  
> /home/ksc10/Desktop/deneme/main.go:5 +0x11  
> exit status 2

İstersek biz de kritik bir bilginin nil girilmesi gibi durumlarda programı durdurabiliriz. Bunun için **panic\(\)** fonksiyonunu kullanacağız. Hemen bir örnek yapalım.

```go
package main

import (
    "fmt"
)

func TamIsim(Ad *string, Soyad *string) {
    if Ad == nil {
        panic("Ad nil olamaz")
    }
    if Soyad == nil {
        panic("Soyad nil olamaz")
    }
    fmt.Printf("%s %s\n", *Ad, *Soyad)
    fmt.Println("TamIsim fonksiyonu bitti")
}

func main() {
    Ad := "Yusuf"
    TamIsim(&Ad, nil)
    fmt.Println("Ana fonksiyon da bitti")
}
```

Çıktımız burada:

> panic: Soyad nil olamaz  
> goroutine 1 \[running\]:  
> main.TamIsim\(0xc00007df30, 0x0\)  
> /Users/Y/Desktop/main.go:12 +0x19a  
> main.main\(\)  
> /Users/Y/Desktop/main.go:20 +0x65  
> exit status 2

Burada **Soyad** değişkeni tanımsız olduğu için programımız durdu. Aynı şekilde **recover\(\)** fonksiyonu ile **panic\(\)** fonksiyonundan gelen veriyi alabilir, ana fonksiyonumuzun kapanmasına da engel olabiliriz. Bunun için de bir örenk yapalım.

```go
package main

import (
    "fmt"
)

func TamIsim(Ad *string, Soyad *string) {
    if Ad == nil {
        panic("Ad nil olamaz")
    }
    if Soyad == nil {
        panic("Soyad nil olamaz")
    }
    fmt.Printf("%s %s\n", *Ad, *Soyad)
    fmt.Println("TamIsim fonksiyonu bitti")
}

func main() {
    Ad := "Yusuf"
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Hata Burada : ", r)
        }
    }()
    TamIsim(&Ad, nil)
    fmt.Println("Ana fonksiyon da bitti")
}
```

Çıktımız burada :

> Panik Yok : Soyad nil olamaz

