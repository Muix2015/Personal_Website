#!/usr/bin/env python
#coding:utf-8
 
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
 
'''
Django 版本大于等于1.7的时候，需要加上下面两句
import django
django.setup()
否则会抛出错误 django.core.exceptions.AppRegistryNotReady: Models aren't loaded yet.
'''

import django
if django.VERSION >= (1, 7):#自动判断版本
    django.setup()
 
 
def main():
    from blog.models import Blog
    f = open('oldblog.txt')
    BlogList = []

    '''
    for line in f:
        title,content = line.split('****')
        # Blog.objects.create(title=title,content=content)
        # 规避导入数据重复的问题，用 get_or_create() 方法替代 create() 方法
        # Blog.objects.get_or_create(title=title,content=content)
        # 使用 Model.objects.bulg_create() 更快更方便
        blog = Blog(title=title, content=content)
        BlogList.append(blog)
    '''
    # 用列表解析式代替上面的 for 循环
    BlogList = [Blog(title=line.split('****')[0], content=line.split('****')[1]) for line in f]
    f.close()
    Blog.objects.bulk_create(BlogList)
 
if __name__ == "__main__":
    main()
    print('Done!')