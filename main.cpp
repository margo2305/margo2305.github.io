#include <iostream>
#include <string>
#include "json.hpp" // Подключаем заголовочный файл

using json = nlohmann::json;

int main() {
    // Данные о книге для сериализации
    json book = {
        {"title", "C++ Programming"},
        {"year", 2026},
        {"is_available", true}
    };

    // Вывод результата сериализации в консоль
    std::cout << "--- JSON Serialization Result ---" << std::endl;
    std::cout << book.dump(4) << std::endl;

    return 0;
}