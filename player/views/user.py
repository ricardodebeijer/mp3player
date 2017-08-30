from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect


def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            context = {
                'message': 'invalid login'
            }
        return render(request, 'login.html', context)
    else:
        return render(request, 'login.html')


def logout_user(request):
    logout(request)
    return render(request, 'login.html')
