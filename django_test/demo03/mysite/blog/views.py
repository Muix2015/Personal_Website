from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import Blog


import json
obj = {"a":1, "b":2}
json_obj = json.dumps(obj)
# Create your views here.
def index(request):
    response = render(request, 'blog/index.html')
    response["Access-Control-Allow-Origin"]="*"
    return response



def get_data(request):
    # response = HttpResponse("server")
    # response["Access-Control-Allow-Origin"]="*"
    # return HttpResponse(response)
    if request.method=="POST":
        data=request.POST.get('tatalPrincipal')
        print("ok")
        status=1
        result="sucuss"
        return HttpResponse(json.dumps({
            "status":status,
            "result":result,
            "data":data
        }))
    else:
        return HttpResponse(json_obj)