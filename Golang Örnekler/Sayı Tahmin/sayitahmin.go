package main

import (
	"fmt"       //Genel
	"math/rand" //rastgele sayı için
	"os"        //Sistem
	"os/exec"   //terminalde kod yürütme için
	"runtime"   //Çalışma ortamı kodları için
	"strconv"   //String'e çevirmek için
	"time"      //Zaman fonksiyonları için
)

func main() {

	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)
	sayi := strconv.Itoa(r1.Intn(10)) //rastgele sayı oluşturduk
	döngü := true
	temizle()
	fmt.Println("Sayı tahmin oyunu")
	fmt.Print("Sayı yazın: ")
	var tahmin string
	for döngü == true { //döngü true iken çalışacak

		fmt.Scanf("%s", &tahmin)
		if tahmin == sayi {
			döngü = false
			temizle()
			fmt.Printf("Tebrikler Doğru sayı: %s", sayi)
		} else if tahmin > sayi {
			temizle()
			fmt.Print("Bilemediniz,Tahmini küçültün\nSayı Yazın: ")
		} else {
			temizle()
			fmt.Print("Bilemediniz,Tahmini büyütün\nSayı Yazın: ")
		}
	}
}
func temizle() { //Terminal Temizleme
	if runtime.GOOS == "linux" {
		cmd := exec.Command("clear")
		cmd.Stdout = os.Stdout
		cmd.Run()
	} else {
		cmd := exec.Command("cls")
		cmd.Stdout = os.Stdout
		cmd.Run()
	}
}
