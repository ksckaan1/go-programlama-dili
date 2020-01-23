# If-Else

If ve Else kelimelerinin Türkçe karşılığına bakacak olursak;

**If :** Eğer, **Else :** Yoksa anlamına gelir. **If-Else** akışı koşullandırmalar için kullanılır. Diğer dillerin aksine koşul parametresi parantezler içine yazılmaz. Teorik kısmı bırakıp uygulama kısmına geçelim ki daha anlaşılır olsun

```go
if koşul {
	//Koşul sağlandığında yapılacak işlemler
} else {
	//Koşul sağlanmadığında yapılacak işlemler
}
```

Yukarıdaki kod tanımına göre örnek bir program yazalım;

```go
package main

import "fmt"

func main() {
 i := 5
 if i == 5 {
  fmt.Println("i'nin değeri 5'tir.")
 } else {
  fmt.Println("i'nin değeri 5 değildir.")
 }
}
```

Yukarıdaki kodları inceleyelim. i’nin değerini 5 verdik. if teriminin sağında i’nin 5 eşitliği koşulunu sorguladık. Eşitse ekrana i’nin değeri 5’tir. yazısını bastıracak. Değilse i’nin değeri 5 değildir. yazısı bastıracak. i’nin değeri 5 olduğu için ekrana i’nin değeri 5’tir. yazısını bastırdı. If-Else akşında else kullanmamız else’nin kod bloğunu boş bırakmamız ile aynı anlama gelir.

```go
i := 10
if i==10 {
 fmt.Println(“i’nin değeri 10’dur.”)
}
```

Yukarıda sadece **if** deyimini girdik. **Else**’yi girmedik. Burada sonuçlanan olay, **i**’nin değeri **10**’a eşitse **i**’nin değeri **10**’dur. yazısını ekrana bastırır. **Else** deyimini girmediğimiz için şartın sağlanmaması durumunda hiçbir işlem gerçekleşmez. Çıktımız **i**’nin değeri **10**’a eşit olduğu için **i**’nin değeri **10**’dur. çıkar.

**ELSE-IF KULLANIMI**

**If-Else** akışında birden fazla koşul kontrolü ekleyebiliriz. Bunu **else if** deyimi ile yapabiliriz. Kısaca bakacak olursak;

```go
i := 5
if i == 5 {
 fmt.Println("i'nin değeri 5'tir.")
} else if i==3{
 fmt.Println("i'nin değeri 3'tür.")
}else{
 fmt.Println("i'nin değeri belirsiz.")
}
```

else if deyiminin yazılışını da gördük. Açıklamaya gelirsek, else if deyimi kendinden önceki deyimin koşulunun sağlanmaması halinde bir sonraki koşulu kontrol ettirir. If-Else akışında istenildiği kadar else if deyimi eklenebilir.

  
**Koşullar İçerisinde Operatör Kullanımı**  
Koşullar içerisinden mantıksal ve ilişkisel operatörler kullanılabilir. Operatörleri görmüştük. Operatör kullanarak örnekler yapalım.

```go
package main
import "fmt"
func main() {
 i := 5
 a := 3
 b := 5
 if i != a { //Birinci Koşul
  fmt.Println("i eşit değildir a")
 }
 if i == b { //İkinci Koşul
  fmt.Println("i eşittir b")
 }
 if i == b && i > a { //Üçüncü Koşul
  fmt.Println("i eşittir b ve i büyüktür a")
 }
}
```

Çıktımız şu şekilde olacaktır;

> i eşit değildir a
>
> i eşittir b
>
> i eşittir b ve i büyüktür a

