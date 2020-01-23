# Kod Gruplama İşlemi

Kod gruplama işlemi çok basit bir işlemdir. Bu işlem sayesinde aynı objeler bloklara göre farklı çalışabilir. Kodları gruplama için süslü parantez kullanırız. Örneğimizi görelim.

```go
package main

import "fmt"

func main() {
    değişken := "bir"
    {
        değişken := "iki"
        fmt.Println(değişken)
    }
    fmt.Println(değişken)
}
```

Çıktımızı gördükten sonra kodları açıklayayım.

> iki
>
> bir

Yukarıda **değişken** isminde değişken oluşturduk. Hemen aşağısına süslü parantez oluşturduk. İçine yine değişken adında bir değişken tanımladık. Bu iki değişken aynı kod bloğunda bulunmadığı için birbirleri ile alakası olmayacaktır. Aslında ikinci tanımlamamızda blok için yeni bir değişken tanımlamış olduk. Bu değişkenler birbirinden farklıdır.

