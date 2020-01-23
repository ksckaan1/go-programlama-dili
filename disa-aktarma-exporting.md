# Dışa Aktarma \(Exporting\)

Golang’ta dışa altarma çok basit bir olaydır. Diğer programlama dillerinde public anahtar kelimesi olarak gördüğümüz bu olayın Golang’ta nasıl yapıldığına bakalım. Golang’ta bunun için bir anahtar kelime yoktur. Dışa aktarılmasını istediğimiz öğeyi oluştururken baş harfini büyük yazarız. Örnek olarak:

```go
func Topla(int x, y) int {
    return x + y
}
```

Gördüğünüz gibi Topla\(\) fonksiyonunun baş harfini büyük yazdır. Peki dışa aktarma hangi durumlarda yapılır.

* Bir paket oluşturup başka bir paket içerisinden dışa aktarılan öğeyi kullanmak istiyorsak,
* Projemiz birden fazla .go dosyası içeriyorsa ve bir sayfadaki öğeyi başka sayfada da kullanmak istiyorsak,

dışa aktarma yöntemi işimizi görecektir.  
Fonksiyonları dışa aktarabildiğimiz gibi değişkenleri ve sabitleride dışa aktarbiliriz. Örnek olarak:

```go
var Degisken = string("değişken değerimiz")
const Sabit = string("sabit değerimiz")
```

Dışa aktarma olayı Golang’ta bu kadar basittir.

