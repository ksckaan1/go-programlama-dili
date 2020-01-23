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

Yukarıda **değişken** isminde değişken oluşturduk. Hemen aşağısına süslü parantez oluşturduk. İçine yine değişken adında bir değişken tanımladık. Bu iki değişken aynı kod bloğunda bulunmadığı için birbirleri ile alakası olmayacaktır. Aslında ikisi de aynı değişkendir. Sadece içindeki bloğa göre farklı bir değeri vardır. Bunu anlamanın en basit yolu pointer ile bellek adresine bakmaktır. Bir o versiyonunu görelim.

```go
package main

import "fmt"

func main() {
	değişken := "bir"
	{
		değişken := "iki"
		fmt.Println(değişken)
		fmt.Println(&değişken)
	}
	fmt.Println(değişken)
	fmt.Println(&değişken)
}
```

**& \(and\)** işareti ile değişkenin bellekteki adresini öğrenebiliriz.

Çıktımız şöyle olacaktır;

> iki
>
> 0xc00008c1d0
>
> bir
>
> 0xc00008c1c0

Gördüğünüz gibi bellek adresi 2 sonuçta da farklı gözüküyor. Bu ikisinin de ayrı değişken olduğuna işaret ediyor.

