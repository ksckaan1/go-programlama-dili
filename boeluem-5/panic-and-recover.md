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
>         /home/ksc10/Desktop/deneme/main.go:5 +0x11   
> exit status 2

