# Tür Dönüşümü

Tür dönüşümü şu şekilde gerçekleştirilir.

**`tür(değer)`**

Örnek olarak bakmak gerekir ise;

```go
i := 42
f := float64(i)
u := uint(f)
```

Yukarıdaki yapılan işlemleri açıklayacak olursak eğer, **i** adında bir `int` değişken tanımladık. **f** adındaki değişkende **i** değişkenini `float64` türüne dönüştürdük. **u** adındaki değişkende ise **f** değişkenini `uint` türüne çevirdik.

Tüm türler arasında bu şekilde dönüşüm gerçekleştiremezsiniz. Bir sayıyı string tipine dönüştürmek istediğimizde ne olacağına bakalım.

```go
deneme := string(8378)
fmt.Println(deneme)
```

**deneme** adındaki değişkenimizin içinde **8378** sayısını **string** türüne dönüştürdük ve hemen aşağısına **deneme**’nin aldığı değeri ekrana bastırması için kodumuzu yazdık.

Aldığımız konsol çıktısı şu şekilde olacaktır.

> ₺

Yani Türk Lirası simgesi çıkacaktır. Sayılar string türüne dönüştürüldüğünde karakter olarak değer alır.
