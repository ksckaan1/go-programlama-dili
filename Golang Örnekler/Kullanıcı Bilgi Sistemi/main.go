package main

import (
	"fmt"
)

func main() {
	var isim, soyisim, tcno string
	var yas int
	var tekrar = int(1)
	for tekrar == 1 {
		fmt.Print("İsminiz-Soyisminiz Nedir?: ")
		fmt.Scanf("%s %s", &isim, &soyisim)
		if isim == "" || soyisim == "" {
			fmt.Println("\nİsim veya Soyisim Boş Girilemez.")
		} else {
			break
		}
	}
	for tekrar == 1 {
		fmt.Printf("\nMerhaba %s, Kaç Yaşındasın?: ", isim)
		fmt.Scanf("%d", &yas)
		if yas == 0 || yas < 0 {
			fmt.Println("\nGeçersiz Yaş Girdiniz.")
		} else {
			break
		}
	}
	for tekrar == 1 {
		fmt.Print("\nTC NO'nuz Nedir?: ")
		fmt.Scanf("%s", &tcno)
		if len(tcno) != 11 {
			fmt.Println("\nTC NO'nuz 11 Haneli olmalıdır.")
		} else {
			break
		}
	}

	fmt.Printf("\nİŞTE TÜM BİLGİLERİNİZ\nİsim-Soyisim: %s %s\nYaş: %d\nTC NO: %s", isim, soyisim, yas, tcno)
	fmt.Scanf("%s")
}
