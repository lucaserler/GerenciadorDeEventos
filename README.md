Administração de Eventos

O fluxo inclui cadastro e login de administradores, JWT, e gestão de eventos associada ao administrador autenticado.
## Funcionalidades

- Cadastro de administradores
- Login com autenticação JWT
- Cadastro de eventos
- Listagem de eventos
- Edição de eventos
- Exclusão de eventos
- Eventos associados ao administrador autenticado
- Interface Web com React
- Interface Mobile com React Native e Expo

## Executar
```powershell
# API porta 8080
cd backend
mvn spring-boot:run

# Frontend porta 5173
cd ../frontend
npm install
npm run dev

#Frontend Mobile porta 8081
cd frontend-mobile
npx expo start
```
