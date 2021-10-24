# Sabitler

Sabitler de değişkenler gibi değer alır. Fakat adından da anlaşılabileceği üzere verilen değer daha sonradan değiştirilemez.

Sabitler tanımlanırken başına const eklenir. Örnek olarak;

```go
const isim string = “Ali”
const isim=”Veli”
```

{% hint style="danger" %}
**const** ile **:=** beraber kullanılamaz.

Yanlış kullanım: **const isim := “Ali”**

Doğru kullanım: **const isim = “Ali”**
{% endhint %}

Örnek olarak bir sabitin değerini atandıktan sonra değiştirmeye çalışalım. Aramızda ne olacağını merak eden çılgınlar olabilir.

Bu şekilde yazıp kodlarımızı derlediğimizde hata almamız kaçınamaz. Derlediğimizde **cannot assign to isim** hatasını verecektir. Yani diyor ki **isim’e atanamıyor**.

```go
const isim string = “Ali”
isim = “Ali”
const yas = 20
```
