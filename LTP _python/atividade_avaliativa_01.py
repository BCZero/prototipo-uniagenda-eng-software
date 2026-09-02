#Sistema de Aprovação de Empréstimo

idade = int(input("Digite sua idade: "))
salario = float(input("Digite o valor de seu salário mensal: "))
emprestimo = float(input("Digite o valor de empréstimo pretendido: "))
margem_emprestimo = salario * 30/100
limite_negacao = salario * 50/100

if idade < 18:
    print("Prezado usuário, infelizmente sua solicitação não foi aceita pelas políticas internas.")

elif emprestimo <= margem_emprestimo:
    print("APROVADO")
elif margem_emprestimo < emprestimo <= limite_negacao:
    print("Análise Manual")
else:
    print("Negado")