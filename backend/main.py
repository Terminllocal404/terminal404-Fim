"""
Terminal_404 - Backend API
Sistema de processamento de formulários e envio de emails
Desenvolvido com FastAPI e segurança empresarial
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import re
import logging
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import html

# Configuração de Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('terminal404.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Inicialização do FastAPI
app = FastAPI(
    title="Terminal_404 API",
    description="API segura para processamento de formulários",
    version="1.0.0"
)

# Rate Limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios permitidos
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Configurações SMTP
SMTP_CONFIG = {
    "host": "smtp.gmail.com",
    "port": 587,
    "email": "terminallocal404@gmail.com",
    "password": "ldyq ybjn wbzp afnr",  # Senha de app do Gmail configurada
    "recipient": "terminallocal404@gmail.com"
}

# ==================== MODELOS DE DADOS ==================== #

class ContactForm(BaseModel):
    """Modelo para formulário de contato simples"""
    name: str
    email: EmailStr
    message: str

    @validator('name')
    def validate_name(cls, v):
        if len(v) < 2 or len(v) > 100:
            raise ValueError('Nome deve ter entre 2 e 100 caracteres')
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', v):
            raise ValueError('Nome deve conter apenas letras')
        return v.strip()

    @validator('message')
    def validate_message(cls, v):
        if len(v) < 10 or len(v) > 2000:
            raise ValueError('Mensagem deve ter entre 10 e 2000 caracteres')
        return v.strip()


class ProjectRequest(BaseModel):
    """Modelo para solicitação de projeto completa"""
    # Dados Pessoais
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    
    # Dados do Projeto
    project_type: str
    project_title: str
    project_description: str
    
    # Especificações Técnicas
    tech_stack: List[str] = []
    deadline: Optional[str] = None
    budget: Optional[str] = None
    
    # Detalhes Adicionais
    has_design: bool = False
    needs_hosting: bool = False
    additional_info: Optional[str] = None

    @validator('name')
    def validate_name(cls, v):
        if len(v) < 2 or len(v) > 100:
            raise ValueError('Nome deve ter entre 2 e 100 caracteres')
        return v.strip()

    @validator('phone')
    def validate_phone(cls, v):
        # Remove caracteres não numéricos
        phone = re.sub(r'\D', '', v)
        if len(phone) < 10 or len(phone) > 11:
            raise ValueError('Telefone inválido')
        return v.strip()

    @validator('project_title')
    def validate_title(cls, v):
        if len(v) < 5 or len(v) > 200:
            raise ValueError('Título deve ter entre 5 e 200 caracteres')
        return v.strip()

    @validator('project_description')
    def validate_description(cls, v):
        if len(v) < 20 or len(v) > 5000:
            raise ValueError('Descrição deve ter entre 20 e 5000 caracteres')
        return v.strip()


# ==================== FUNÇÕES AUXILIARES ==================== #

def sanitize_html(text: str) -> str:
    """Sanitiza texto para prevenir XSS"""
    return html.escape(text)


def send_email(subject: str, body: str, is_html: bool = True) -> bool:
    """
    Envia email via SMTP do Gmail
    
    Args:
        subject: Assunto do email
        body: Corpo do email (HTML ou texto)
        is_html: Se True, envia como HTML
    
    Returns:
        bool: True se enviado com sucesso, False caso contrário
    """
    try:
        # Criar mensagem
        msg = MIMEMultipart('alternative')
        msg['From'] = SMTP_CONFIG['email']
        msg['To'] = SMTP_CONFIG['recipient']
        msg['Subject'] = subject
        
        # Adicionar corpo
        if is_html:
            msg.attach(MIMEText(body, 'html', 'utf-8'))
        else:
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
        
        # Conectar e enviar
        with smtplib.SMTP(SMTP_CONFIG['host'], SMTP_CONFIG['port']) as server:
            server.starttls()
            server.login(SMTP_CONFIG['email'], SMTP_CONFIG['password'])
            server.send_message(msg)
        
        logger.info(f"Email enviado com sucesso: {subject}")
        return True
        
    except Exception as e:
        logger.error(f"Erro ao enviar email: {str(e)}")
        return False


def format_contact_email(data: ContactForm) -> str:
    """Formata email de contato simples em HTML"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #05070D; color: #fff; margin: 0; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #0B0F1A; border: 2px solid #00E5FF; border-radius: 10px; padding: 30px; }}
            .header {{ text-align: center; border-bottom: 2px solid #00E5FF; padding-bottom: 20px; margin-bottom: 20px; }}
            .header h1 {{ color: #00E5FF; margin: 0; }}
            .field {{ margin-bottom: 15px; padding: 15px; background: #05070D; border-left: 3px solid #00E5FF; border-radius: 5px; }}
            .label {{ color: #00E5FF; font-weight: bold; margin-bottom: 5px; }}
            .value {{ color: #B0B3B8; }}
            .footer {{ text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #00E5FF; color: #B0B3B8; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>💬 Nova Mensagem de Contato</h1>
                <p style="color: #B0B3B8; margin: 10px 0 0 0;">Terminal_404</p>
            </div>
            
            <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">{sanitize_html(data.name)}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">{sanitize_html(data.email)}</div>
            </div>
            
            <div class="field">
                <div class="label">💭 Mensagem:</div>
                <div class="value">{sanitize_html(data.message)}</div>
            </div>
            
            <div class="footer">
                <p>Recebido em: {datetime.now().strftime('%d/%m/%Y às %H:%M:%S')}</p>
                <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
            </div>
        </div>
    </body>
    </html>
    """


def format_project_email(data: ProjectRequest) -> str:
    """Formata email de solicitação de projeto em HTML"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #05070D; color: #fff; margin: 0; padding: 20px; }}
            .container {{ max-width: 700px; margin: 0 auto; background: #0B0F1A; border: 2px solid #00E5FF; border-radius: 10px; padding: 30px; }}
            .header {{ text-align: center; border-bottom: 2px solid #00E5FF; padding-bottom: 20px; margin-bottom: 20px; }}
            .header h1 {{ color: #00E5FF; margin: 0; }}
            .section {{ margin-bottom: 25px; }}
            .section-title {{ color: #00E5FF; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #00E5FF; }}
            .field {{ margin-bottom: 15px; padding: 15px; background: #05070D; border-left: 3px solid #00E5FF; border-radius: 5px; }}
            .label {{ color: #00E5FF; font-weight: bold; margin-bottom: 5px; }}
            .value {{ color: #B0B3B8; }}
            .tech-stack {{ display: flex; flex-wrap: wrap; gap: 10px; }}
            .tech-badge {{ background: #00E5FF; color: #0B0F1A; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }}
            .footer {{ text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #00E5FF; color: #B0B3B8; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Nova Solicitação de Projeto</h1>
                <p style="color: #B0B3B8; margin: 10px 0 0 0;">Terminal_404</p>
            </div>
            
            <div class="section">
                <div class="section-title">👤 Dados do Cliente</div>
                <div class="field">
                    <div class="label">Nome:</div>
                    <div class="value">{sanitize_html(data.name)}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">{sanitize_html(data.email)}</div>
                </div>
                <div class="field">
                    <div class="label">Telefone:</div>
                    <div class="value">{sanitize_html(data.phone)}</div>
                </div>
                {f'<div class="field"><div class="label">Empresa:</div><div class="value">{sanitize_html(data.company)}</div></div>' if data.company else ''}
            </div>
            
            <div class="section">
                <div class="section-title">📋 Informações do Projeto</div>
                <div class="field">
                    <div class="label">Tipo de Projeto:</div>
                    <div class="value">{sanitize_html(data.project_type)}</div>
                </div>
                <div class="field">
                    <div class="label">Título:</div>
                    <div class="value">{sanitize_html(data.project_title)}</div>
                </div>
                <div class="field">
                    <div class="label">Descrição:</div>
                    <div class="value">{sanitize_html(data.project_description)}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">⚙️ Especificações Técnicas</div>
                {('<div class="field"><div class="label">Tecnologias:</div><div class="tech-stack">' + "".join([f'<span class="tech-badge">{sanitize_html(tech)}</span>' for tech in data.tech_stack]) + '</div></div>') if data.tech_stack else '<div class="field"><div class="value">Não especificado</div></div>'}
                {f'<div class="field"><div class="label">Prazo:</div><div class="value">{sanitize_html(data.deadline)}</div></div>' if data.deadline else ''}
                {f'<div class="field"><div class="label">Orçamento:</div><div class="value">{sanitize_html(data.budget)}</div></div>' if data.budget else ''}
            </div>
            
            <div class="section">
                <div class="section-title">📦 Requisitos Adicionais</div>
                <div class="field">
                    <div class="label">Possui Design:</div>
                    <div class="value">{'✅ Sim' if data.has_design else '❌ Não'}</div>
                </div>
                <div class="field">
                    <div class="label">Precisa de Hospedagem:</div>
                    <div class="value">{'✅ Sim' if data.needs_hosting else '❌ Não'}</div>
                </div>
                {f'<div class="field"><div class="label">Informações Adicionais:</div><div class="value">{sanitize_html(data.additional_info)}</div></div>' if data.additional_info else ''}
            </div>
            
            <div class="footer">
                <p>Recebido em: {datetime.now().strftime('%d/%m/%Y às %H:%M:%S')}</p>
                <p>Terminal_404 - Tecnologia & Desenvolvimento</p>
            </div>
        </div>
    </body>
    </html>
    """


# ==================== ROTAS DA API ==================== #

@app.get("/")
async def root():
    """Rota raiz da API"""
    return {
        "message": "Terminal_404 API",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "contact": "/api/contact",
            "project": "/api/project-request",
            "health": "/health"
        }
    }


@app.get("/api/health")
async def health_check():
    """Verifica saúde da API"""
    return {
        "status": "online",
        "message": "Terminal_404 API Running",
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/contact")
@limiter.limit("5/minute")  # Máximo 5 requisições por minuto
async def contact_form(request: Request, data: ContactForm):
    """
    Processa formulário de contato simples
    
    Rate Limit: 5 requisições por minuto por IP
    """
    try:
        logger.info(f"Nova mensagem de contato de: {data.email}")
        
        # Formatar e enviar email
        subject = f"[CONTATO] Mensagem de {data.name}"
        body = format_contact_email(data)
        
        if send_email(subject, body):
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Mensagem enviada com sucesso!"
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erro ao enviar email")
            
    except Exception as e:
        logger.error(f"Erro no formulário de contato: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar solicitação")


@app.post("/api/project-request")
@limiter.limit("3/minute")  # Máximo 3 requisições por minuto
async def project_request(request: Request, data: ProjectRequest):
    """
    Processa solicitação de projeto completa
    
    Rate Limit: 3 requisições por minuto por IP
    """
    try:
        logger.info(f"Nova solicitação de projeto de: {data.email} - {data.project_title}")
        
        # Formatar e enviar email
        subject = f"[PROJETO] {data.project_type} - {data.project_title}"
        body = format_project_email(data)
        
        if send_email(subject, body):
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Solicitação enviada com sucesso! Entraremos em contato em breve."
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erro ao enviar email")
            
    except Exception as e:
        logger.error(f"Erro na solicitação de projeto: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar solicitação")


# ==================== TRATAMENTO DE ERROS ==================== #

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Tratamento personalizado de erros HTTP"""
    logger.warning(f"HTTP Error {exc.status_code}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Tratamento de erros gerais"""
    logger.error(f"Erro não tratado: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Erro interno do servidor"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)