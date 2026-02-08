
print("import { BlogPost } from '../types';")
for i in range(1, 61):
    print(f"import {{ post{i} }} from './blog/post-{i}';")

print("\nexport const BLOG_POSTS: BlogPost[] = [")
for i in range(60, 0, -1):
    print(f"    post{i},")
print("];")
