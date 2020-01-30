# Golang Hakkında

Golang \(diğer adıyla Go\), **Google**’ın **2007** yılından beri geliştirdiği açık kaynaklı programlama dilidir. Daha çok alt-sistem programlama için tasarlanmış olup, derlenebilir ve **statik** tipli bir dildir. İlk versiyonu **Kasım 2009**‘da çıkmıştır. Derleyicisi olan **“gc” \(Go Compiler\)** açık kaynak olarak birçok işletim sistemi için geliştirilmiştir.

Golang, Google mühendislerinden olan **Robert Griesemer, Rob Pike ve Ken Thompson** tarafından ilk olarak deney amaçlı ortaya çıkmıştır. Diğer dillerdeki eleştirilen sorunlara çözüm getirmek ve iyi yönlerini korumak için çıkarılmıştır.

Bu adamların daha önceden bulunmuş olduğu projelere bakacak olursak Google’ın gerçekten bu kişileri cımbızla seçtiğini anlayabiliriz. İşte Golang’ın yaratıcılarının bulunduğu projeler:

| ![Ken Thompson](../.gitbook/assets/ken.png) | ![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LzCwvXTkWXBKIvbtzHZ%2F-LzDHbwlJmPgsn4Tr4UZ%2F-LzDIhOVf5_XFkT90LKM%2Frob.jpg?alt=media&token=c11be5e1-d017-4f10-b361-953ee37b1ca2) | ![](../.gitbook/assets/robert.png) |
| :---: | :---: | :---: |
| Ken Thompson | Rob Pike | Robert Griesemer |

**Robert Griesemer:** Hotspot ve JVM \(Java Sanal Makinesi\)

**Rob Pike:** UNIX ve UTF-8

**Ken Thompson:** B, C, UNIX ve UTF-8

**Dilin Özellikleri**

* Statik yazılmıştır, fakat dinamik rahatlığındadır.
* Büyük sistemlere ölçeklenebilir.
* Üretken ve okunabilir olması, çok fazla zorunlu anahtar kelime ve tekrarlamaların kullanılmaması
* Tümleşik Geliştirme Ortamına \(IDE\) ihtiyaç duyulmaması fakat desteklemesi
* Ağ ve çoklu işlemleri desteklemesi
* Değişken tanımında tür belirtimi isteğe bağlıdır.
* Hızlı derlenme süresi
* Uzak paket yöneticisi \(go get\)

**Örnek Merhaba Dünya Uygulaması**

```go
   package main

   import “fmt”

   func main(){
       fmt.Println(“Merhaba Dünya!”)
   }
```

