import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Printer,
  Mail,
  Share2,
  Copy,
  DollarSign,
  TrendingUp,
  X,
  PlusCircle,
  Upload,
  CheckCircle,
  XCircle,
  Trash,
  LayoutDashboard,
  Settings,
  Briefcase,
  Users
} from 'lucide-react';

// ==================== Componentes da Aplicação Principal ====================

// Componente principal da aplicação que gerencia o roteamento e o layout
export default function App() {
  const [currentPage, setCurrentPage] = useState('clients'); // Definindo 'clients' como a página inicial

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'orders':
        return <ServiceOrdersPage />;
      case 'clients':
        return <ClientsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ClientsPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

// Componente de Sidebar para navegação
const Sidebar = ({ currentPage, setCurrentPage }) => (
  <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen rounded-r-2xl shadow-lg">
    <div className="text-2xl font-bold mb-8 text-green-400">RhynoERP</div>
    <nav className="flex-1">
      <SidebarLink
        icon={<LayoutDashboard className="h-5 w-5" />}
        text="Dashboard"
        isActive={currentPage === 'dashboard'}
        onClick={() => setCurrentPage('dashboard')}
      />
      <SidebarLink
        icon={<Briefcase className="h-5 w-5" />}
        text="Ordens de Serviço"
        isActive={currentPage === 'orders'}
        onClick={() => setCurrentPage('orders')}
      />
      <SidebarLink
        icon={<Users className="h-5 w-5" />}
        text="Clientes"
        isActive={currentPage === 'clients'}
        onClick={() => setCurrentPage('clients')}
      />
      <SidebarLink
        icon={<Settings className="h-5 w-5" />}
        text="Configurações"
        isActive={currentPage === 'settings'}
        onClick={() => setCurrentPage('settings')}
      />
    </nav>
  </aside>
);

// Componente de link da Sidebar
const SidebarLink = ({ icon, text, isActive, onClick }) => (
  <a
    href="#"
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
      isActive ? 'bg-gray-800 text-green-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    {icon}
    <span>{text}</span>
  </a>
);

// Componente simulado da página de Dashboard
const DashboardPage = () => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
    <p className="mt-4 text-gray-600">Conteúdo do dashboard aqui...</p>
  </div>
);

// Componente simulado da página de Configurações
const SettingsPage = () => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
    <p className="mt-4 text-gray-600">Ajustes e configurações do sistema...</p>
  </div>
);


// ==================== Componente da Página de Clientes (Novo) ====================
function ClientsPage() {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8001/clients');
            if (!response.ok) {
                throw new Error('Falha ao buscar os clientes.');
            }
            const data = await response.json();
            setClients(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewClient({ name: '', email: '', phone: '', address: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8001/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClient),
            });
            if (!response.ok) {
                throw new Error('Falha ao criar o cliente.');
            }
            const createdClient = await response.json();
            setClients(prev => [createdClient, ...prev]);
            closeModal();
        } catch (err) {
            setError(err.message);
        }
    };
    
    const filteredClients = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
                <Button onClick={openModal}>
                    <Plus className="mr-2 h-4 w-4" /> Novo Cliente
                </Button>
            </div>
            <div className="flex items-center mb-6 gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Pesquisar por nome ou e-mail..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full"
                    />
                </div>
            </div>
            {isLoading ? (
              <div className="text-center p-8 text-gray-500">Carregando clientes...</div>
            ) : error ? (
              <div className="text-center p-8 text-red-500">Erro: {error}</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden md:table-cell">Telefone</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    Nenhum cliente encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
              </div>
            )}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <div className="flex items-center justify-between pb-4 border-b">
                        <DialogTitle>Criar Novo Cliente</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-4 w-4" /></Button>
                    </div>
                    <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nome</Label>
                            <Input id="name" name="name" value={newClient.name} onChange={handleInputChange} className="col-span-3" placeholder="Nome do Cliente" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={newClient.email} onChange={handleInputChange} className="col-span-3" placeholder="email@exemplo.com" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Telefone</Label>
                            <Input id="phone" name="phone" value={newClient.phone} onChange={handleInputChange} className="col-span-3" placeholder="(99) 99999-9999" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Endereço</Label>
                            <Input id="address" name="address" value={newClient.address} onChange={handleInputChange} className="col-span-3" placeholder="Endereço completo" />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Salvar Cliente</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ==================== Componente de Ordens de Serviço (Atualizado) ====================
function ServiceOrdersPage() {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('os');
  const [newOrder, setNewOrder] = useState({
    client_name: '',
    service_description: '',
    status: 'Pendente',
    items: [],
    financial: { condition: '', total_value: 0 },
    notes: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceOrders();
  }, []);

  const fetchServiceOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/service_orders');
      if (!response.ok) {
        throw new Error('Falha ao buscar as ordens de serviço');
      }
      const data = await response.json();
      setServiceOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTab('os');
    setNewOrder({
      client_name: '',
      service_description: '',
      status: 'Pendente',
      items: [],
      financial: { condition: '', total_value: 0 },
      notes: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...newOrder.items];
    newItems[index][name] = value;
    setNewOrder(prev => ({ ...prev, items: newItems }));
  };

  const handleAddItem = () => {
    const newItems = [...newOrder.items, { description: '', quantity: 1, unit_price: 0 }];
    setNewOrder(prev => ({ ...prev, items: newItems }));
  };

  const handleRemoveItem = (index) => {
    const newItems = newOrder.items.filter((_, i) => i !== index);
    setNewOrder(prev => ({ ...prev, items: newItems }));
  };

  const handleFinancialChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, financial: { ...prev.financial, [name]: value } }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/service_orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) {
        throw new Error('Falha ao criar a ordem de serviço');
      }
      const createdOrder = await response.json();
      setServiceOrders(prev => [createdOrder, ...prev]);
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída': return <Badge color="green">{status}</Badge>;
      case 'Em Andamento': return <Badge color="blue">{status}</Badge>;
      case 'Pendente': return <Badge color="yellow">{status}</Badge>;
      case 'Cancelada': return <Badge color="red">{status}</Badge>;
      default: return <Badge color="gray">{status}</Badge>;
    }
  };

  const filteredOrders = serviceOrders.filter(order =>
    order.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTabContent = () => {
    switch (activeTab) {
      case 'os':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client_name" className="text-right">Cliente</Label>
              <Input
                id="client_name"
                name="client_name"
                value={newOrder.client_name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Nome do Cliente"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service_description" className="text-right">Descrição</Label>
              <Input
                id="service_description"
                name="service_description"
                value={newOrder.service_description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Descrição do Serviço"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                id="status"
                name="status"
                value={newOrder.status}
                onValueChange={(value) => setNewOrder(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'items':
        return (
          <div className="py-4">
            <h4 className="text-lg font-semibold mb-2">Itens da Ordem de Serviço</h4>
            {newOrder.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <Input
                  name="description"
                  placeholder="Descrição do item"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  className="flex-grow"
                />
                <Input
                  name="quantity"
                  type="number"
                  placeholder="Qtd"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-20"
                />
                <Input
                  name="unit_price"
                  type="number"
                  placeholder="R$"
                  value={item.unit_price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-24"
                />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddItem} className="w-full mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item
            </Button>
          </div>
        );
      case 'financial':
        return (
          <div className="grid gap-4 py-4">
            <h4 className="text-lg font-semibold mb-2">Informações Financeiras</h4>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">Condição</Label>
              <Input
                id="condition"
                name="condition"
                value={newOrder.financial.condition}
                onChange={handleFinancialChange}
                className="col-span-3"
                placeholder="Condição de Pagamento"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_value" className="text-right">Valor Total</Label>
              <Input
                id="total_value"
                name="total_value"
                type="number"
                value={newOrder.financial.total_value}
                onChange={handleFinancialChange}
                className="col-span-3"
                placeholder="Valor Total"
              />
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="grid gap-4 py-4">
            <h4 className="text-lg font-semibold mb-2">Observações e Anexos</h4>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="notes">Observações</Label>
              <textarea
                id="notes"
                name="notes"
                value={newOrder.notes}
                onChange={(e) => setNewOrder(prev => ({ ...prev, notes: e.target.value }))}
                className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Adicione observações importantes aqui..."
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Anexos</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ordens de Serviço</h1>
          <Button onClick={openModal}>
            <Plus className="mr-2 h-4 w-4" /> Nova OS
          </Button>
        </div>
        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar por cliente ou número da OS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <Button variant="outline">
            <span className="hidden sm:inline">Filtrar por Status</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        {isLoading ? (
          <div className="text-center p-8 text-gray-500">Carregando ordens de serviço...</div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">Erro: {error}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número da OS</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Serviço</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.number}</TableCell>
                      <TableCell>{order.client_name}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.service_description}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.value)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => console.log('Lançar contas para OS:', order.id)}>
                              <DollarSign className="mr-2 h-4 w-4" /> Lançar contas
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Lançar estoque para OS:', order.id)}>
                              <TrendingUp className="mr-2 h-4 w-4" /> Lançar estoque
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('Gerar nota de serviço para OS:', order.id)}>
                              <FileText className="mr-2 h-4 w-4" /> Gerar nota serviço
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Gerar nota fiscal para OS:', order.id)}>
                              <FileText className="mr-2 h-4 w-4" /> Gerar nota fiscal
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('Imprimir OS:', order.id)}>
                              <Printer className="mr-2 h-4 w-4" /> Imprimir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Imprimir etiqueta para OS:', order.id)}>
                              <Printer className="mr-2 h-4 w-4" /> Imprimir etiqueta
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Imprimir para técnico para OS:', order.id)}>
                              <Printer className="mr-2 h-4 w-4" /> Imprimir para técnico
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Emitir boleto para OS:', order.id)}>
                              <FileText className="mr-2 h-4 w-4" /> Emitir boleto
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('Enviar por e-mail OS:', order.id)}>
                              <Mail className="mr-2 h-4 w-4" /> Enviar por e-mail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Enviar por whatsapp OS:', order.id)}>
                              <Share2 className="mr-2 h-4 w-4" /> Enviar por whatsapp
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('Clonar ordem:', order.id)}>
                              <Copy className="mr-2 h-4 w-4" /> Clonar ordem
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Mudar Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => console.log('Status alterado para: Orçada', order.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Orçada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Status alterado para: Serviço concluído', order.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Serviço concluído
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Status alterado para: Finalizada', order.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Finalizada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Status alterado para: Não aprovada', order.id)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-500" /> Não aprovada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Status alterado para: Aprovada', order.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Aprovada
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      Nenhuma ordem de serviço encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Modal para Adicionar Nova OS */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <div className="flex items-center justify-between pb-4 border-b">
            <DialogTitle>Criar Nova Ordem de Serviço</DialogTitle>
            <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-4 w-4" /></Button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <nav className="flex space-x-2 border-b">
              <Button type="button" variant="ghost" onClick={() => setActiveTab('os')} className={activeTab === 'os' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}>OS</Button>
              <Button type="button" variant="ghost" onClick={() => setActiveTab('items')} className={activeTab === 'items' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}>Itens</Button>
              <Button type="button" variant="ghost" onClick={() => setActiveTab('financial')} className={activeTab === 'financial' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}>Financeiro</Button>
              <Button type="button" variant="ghost" onClick={() => setActiveTab('notes')} className={activeTab === 'notes' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}>Observações</Button>
            </nav>
            {getTabContent()}
            <DialogFooter>
              <Button type="submit">Salvar Ordem de Serviço</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ==================== Componentes Reutilizáveis ====================
// Componente para um badge de status
const Badge = ({ children, color }) => {
  const colorMap = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color] || colorMap.gray}`}>
      {children}
    </span>
  );
};

// Componentes simples simulando shadcn/ui. Em um projeto real, você os importaria.
const Button = ({ children, onClick, variant = 'primary', size = 'default', className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
  };
  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Table = ({ children }) => <div className="w-full"><table className="w-full text-sm">{children}</table></div>;
const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>;
const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b transition-colors hover:bg-gray-50">{children}</tr>;
const TableHead = ({ children, className }) => <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>;
const TableCell = ({ children, className }) => <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>;
const Label = ({ children, className, ...props }) => <label className={`text-sm font-medium leading-none ${className}`} {...props}>{children}</label>;

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => children;
const DialogTitle = ({ children }) => <h3 className="text-xl font-semibold text-gray-800">{children}</h3>;
const DialogDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
const DialogFooter = ({ children }) => <div className="mt-6 flex justify-end gap-2">{children}</div>;

const Select = ({ id, name, value, onValueChange, children }) => (
  <div className="relative">
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="appearance-none h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
  </div>
);
const SelectTrigger = ({ children }) => <div className="hidden"></div>;
const SelectValue = ({ placeholder }) => <option value="" disabled>{placeholder}</option>;
const SelectContent = ({ children }) => children;
const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>{children[0]}</div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children[1]}</div>
        </div>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild }) => {
  if (asChild) return children;
  return <Button>{children}</Button>;
};

const DropdownMenuContent = ({ children, align }) => <div>{children}</div>;
const DropdownMenuLabel = ({ children }) => <div className="px-4 py-2 text-xs font-semibold text-gray-500">{children}</div>;
const DropdownMenuItem = ({ children, onClick }) => (
  <div
    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    onClick={onClick}
  >
    {children}
  </div>
);
const DropdownMenuSeparator = () => <div className="my-1 h-px bg-gray-200"></div>;
