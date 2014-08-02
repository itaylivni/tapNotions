#include <iostream>
#include "font_to_svg.hpp"

int main(){
  font_to_svg::glyph g("ubuntu-font-family-0.80/Ubuntu-B.ttf",'e');
  std::cout << g.outline();
}
