# Klasör Build Etme

Oluşturduğumuz **.go** dosyaları birden fazla parçadan oluşuyorsa aşağıdaki komut ile klasör içerisindeyken build işlemini yapabiliriz.

`go build . //sonda nokta işareti var`

Eğer klasörün dışından build işlemi yapacaksak nokta yerine klasörün yolunu girmemiz gerekir. Aşağıda gösterilmiştir.

Build işleminde sadece **.go** dosyaları derlenir. Tüm dosyalar işlenip tek başına çalıştırılabilir dosyaya dönüştürülür. Yani yanındaki Html, Css, Js vs. türünde dosyalar paket içine alınmaz. Tümüyle dosyları paketlemek için ek kütüphaneler kullanabilirsiniz. Önerim **Statik** isimli kütüphanedir. İlerideki bölümlerde zaten bu kütüphaneyi kullanıyor olacağız.

`go build /klasör/yolunu/buraya/girin`

