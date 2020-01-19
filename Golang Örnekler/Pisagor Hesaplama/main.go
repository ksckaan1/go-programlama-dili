package main

import (
	"fmt"
	"math"
)

func main() {
	var ken1, ken2, hipo float64

	fmt.Println("Dik üçgende Hipotenüs bulma programına hoşgeldiniz!")
	fmt.Print("1. kenarı girin: ")
	fmt.Scan(&ken1)
	fmt.Print("\n2. kenarı girin: ")
	fmt.Scan(&ken2)
	hipo = math.Sqrt(math.Pow(ken1, 2) + math.Pow(ken2, 2))
	fmt.Printf("\nHipotenüs: %f\n Çıkmak için [ENTER] tuşuna basın...", hipo)
	fmt.Scanf("%s")
}
