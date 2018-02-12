typedef struct {
  int x;
  int y;
} Vec2;

int main ()
{
  int x = 10;
  int y = 15;
  int *x_ptr = &x;
  int *y_ptr = &y;

  Vec2 vec = { *x_ptr, *y_ptr };

  printf("Vector: %d, %d", vec.x, vec.y);

  return 0;
}
