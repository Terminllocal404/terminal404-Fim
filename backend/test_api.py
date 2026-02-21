#!/usr/bin/env python3
"""
Terminal_404 - Script de Teste da API
Testa todos os endpoints do backend
"""

import requests
import json
from colorama import Fore, Style, init

# Inicializar colorama
init(autoreset=True)

BASE_URL = "http://localhost:8000"

def print_header(text):
    print(f"\n{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}{text.center(60)}")
    print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")

def print_success(text):
    print(f"{Fore.GREEN}✅ {text}{Style.RESET_ALL}")

def print_error(text):
    print(f"{Fore.RED}❌ {text}{Style.RESET_ALL}")

def print_info(text):
    print(f"{Fore.YELLOW}ℹ️  {text}{Style.RESET_ALL}")

def test_root():
    """Testa endpoint raiz"""
    print_header("Testando Endpoint Raiz")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print_success("Endpoint raiz está respondendo")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
            return True
        else:
            print_error(f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Erro ao conectar: {str(e)}")
        print_info("Certifique-se que o backend está rodando: python3 main.py")
        return False

def test_health():
    """Testa health check"""
    print_header("Testando Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print_success("Health check passou")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
            return True
        else:
            print_error(f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_contact():
    """Testa endpoint de contato"""
    print_header("Testando Formulário de Contato")
    
    data = {
        "name": "João Teste",
        "email": "teste@exemplo.com",
        "message": "Esta é uma mensagem de teste do sistema Terminal_404. Testando o envio de emails via API."
    }
    
    print_info("Enviando dados:")
    print(json.dumps(data, indent=2))
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print_success("Formulário de contato enviado com sucesso!")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
            print_info("Verifique o email: terminallocal404@gmail.com")
            return True
        else:
            print_error(f"Status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_project_request():
    """Testa endpoint de solicitação de projeto"""
    print_header("Testando Solicitação de Projeto")
    
    data = {
        "name": "Maria Teste",
        "email": "maria@exemplo.com",
        "phone": "(32) 99100-4523",
        "company": "Empresa Teste LTDA",
        "project_type": "Website Institucional",
        "project_title": "Site Corporativo Moderno",
        "project_description": "Preciso de um site institucional moderno e responsivo para minha empresa, com área de contato, sobre nós e portfólio de serviços.",
        "tech_stack": ["React", "TypeScript", "Tailwind CSS", "FastAPI"],
        "deadline": "2 meses",
        "budget": "R$ 10.000 - R$ 20.000",
        "has_design": True,
        "needs_hosting": True,
        "additional_info": "Gostaria também de integração com redes sociais e formulário de newsletter."
    }
    
    print_info("Enviando dados:")
    print(json.dumps(data, indent=2))
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/project-request",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print_success("Solicitação de projeto enviada com sucesso!")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
            print_info("Verifique o email: terminallocal404@gmail.com")
            return True
        else:
            print_error(f"Status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_validation():
    """Testa validação de dados"""
    print_header("Testando Validação de Dados")
    
    # Teste com dados inválidos
    invalid_data = {
        "name": "A",  # Nome muito curto
        "email": "email-invalido",  # Email inválido
        "message": "Msg"  # Mensagem muito curta
    }
    
    print_info("Enviando dados inválidos propositalmente:")
    print(json.dumps(invalid_data, indent=2))
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=invalid_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 422:
            print_success("Validação funcionando corretamente (rejeitou dados inválidos)")
            print(f"Erros de validação: {json.dumps(response.json(), indent=2)}")
            return True
        else:
            print_error(f"Validação não funcionou como esperado. Status: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def main():
    """Executa todos os testes"""
    print(f"{Fore.CYAN}{Style.BRIGHT}")
    print("╔════════════════════════════════════════════════════════════╗")
    print("║         Terminal_404 - Suite de Testes da API             ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print(Style.RESET_ALL)
    
    results = []
    
    # Executar testes
    results.append(("Endpoint Raiz", test_root()))
    results.append(("Health Check", test_health()))
    results.append(("Validação de Dados", test_validation()))
    
    # Perguntar antes de testar envio de emails
    print(f"\n{Fore.YELLOW}⚠️  Os próximos testes enviarão emails reais!{Style.RESET_ALL}")
    print_info("Certifique-se de ter configurado a senha de app do Gmail corretamente.")
    confirm = input(f"\n{Fore.CYAN}Deseja continuar com os testes de email? (s/n): {Style.RESET_ALL}")
    
    if confirm.lower() == 's':
        results.append(("Formulário de Contato", test_contact()))
        results.append(("Solicitação de Projeto", test_project_request()))
    else:
        print_info("Testes de email pulados.")
    
    # Resumo dos resultados
    print_header("Resumo dos Testes")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        if result:
            print_success(f"{test_name}: PASSOU")
        else:
            print_error(f"{test_name}: FALHOU")
    
    print(f"\n{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}Total: {passed}/{total} testes passaram")
    print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")
    
    if passed == total:
        print(f"{Fore.GREEN}{Style.BRIGHT}🎉 Todos os testes passaram! Sistema funcionando perfeitamente!{Style.RESET_ALL}\n")
    else:
        print(f"{Fore.YELLOW}{Style.BRIGHT}⚠️  Alguns testes falharam. Verifique a configuração.{Style.RESET_ALL}\n")

if __name__ == "__main__":
    main()
