# Değişkenler ve Atanması

**Değişkenler** içerisinde değer barındırarak RAM’e kaydettiğimiz bilgilerdir. Değişkenler programımızın işleyişinde önemli bir role sahiptir. Değişkenleri şu şekillerde atayabiliriz. Değişkenler **var** ifadesi ile atanır. Tabi ki zorunlu değildir.

```go
var isim string = “Ali”
var yas int = 20
var ogrenci bool = true
```

Yukarıdaki yazdıklarımızı inceleyecek olursak;

**var** ile değişken atadığımızı belirtiyoruz. **isim** diye bir değişken adı atadık ve içine **“Ali**” değerinde **string** tipinde bir değer yerleştirdik. String tipi değerler çift tırnak içine yazılır.

Aynı şekilde **yas** adında değişken oluşturduk. **yas** değişkeni içerisine **int** tipinde **20** değerini yerleştirdik Son olarak **ogrenci** adında bir değişken oluşturduk ve **true** değerinde **boolean** tipinde bir atama yaptık.

Golang’ta değişken adı oluştururken Türkçe karakterler kullanabiliriz. Örnek olarak **ogrenci** yerine öğrenci yazabilirdik. Ama başka bir programlama diline geçtiğinizde Türkçe harf desteklememesi halinde alışkanlıklarınızı değiştirmeniz gerekecek. O yüzden Türkçe karakter kullanmamanızı tavsiye ederim. Tabi ki zorunlu değil.

Programlama dillerinde, matematiğin aksine **= \(eşittir\)** işareti eşitlik için değil, atamalar için kullanılır.

Değişkenlerin atanması için farklı yöntemler de var. Diğer yöntemlere değinmek gerekirse;

Değişken atamasında illaki değişkenin veri tipini belirtmemiz gerekmez. Yazdığımız değere göre Golang otomatik olarak veri tipini algılar.

```go
var isim = “Ali”
var yas = 20
var ogrenci = true
```

**isim** değişkeninin değerini çift tırnak arasına yazdığımız için **string** veri tipinde olduğunu algılayacaktır.

**yas** değişkeninin değerini sayı olarak girdiğimiz için **int** tipinde olduğunu algılar. Eğer 20 değil de 2.12312 gibi küsüratlı bir değer girseydik veri tipini **float** olarak algılardı.

**ogrenci** değişkeninin değerini mantıksal olarak girdiğimiz için **boolean** veri tipinde olduğunu algılayacaktır.

En basit şekilde değişken ataması yapmak istersek;

```go
isim:=”Ali”
yas:=20
ogrenci:=true
```

Başına **var** eklemeden de değişken atamak mümkündür. Bu şekilde yapmak için **:=** işaretlerini kullanırız. Aynı şekilde bu yöntemde de verinin tipi otomatik algılanır.

Eğer değişken tanımlar iken değer kısmını boş bırakırsak yani; **var yas int** şeklinde yazarsak, önceki konuda da bahsettiğimiz gibi varsayılan olarak **0** değerini alır.

