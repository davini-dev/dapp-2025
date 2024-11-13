// app/items/page.tsx
// Davini
"use client";

import { Button, Label, Table, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";

// Definição de interface para o Item
interface Item {
  id: number;
  name: string;
  description: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Função para buscar os itens da API
  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items");
      const data: Item[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar os itens", error);
    }
  };

  // Função para adicionar um novo item
  const addItem = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Erro ao adicionar item", error);
    }
  };

  // Função para atualizar um item existente
  const updateItem = async (e: FormEvent) => {
    e.preventDefault();
    if (editingItemId === null) return;
    try {
      await fetch("/api/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editingItemId, name, description }),
      });
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Erro ao atualizar item", error);
    }
  };

  // Função para deletar um item
  const deleteItem = async (id: number) => {
    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchItems();
    } catch (error) {
      console.error("Erro ao deletar item", error);
    }
  };

  // Função para resetar o formulário e sair do modo de edição
  const resetForm = () => {
    setName("");
    setDescription("");
    setEditMode(false);
    setEditingItemId(null);
  };

  // Função para ativar o modo de edição
  const handleEdit = (item: Item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItemId(item.id);
    setEditMode(true);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Items</h1>
      <form onSubmit={editMode ? updateItem : addItem} className="mt-4">
        <Label className="mb-2 block" htmlFor="name">
          Name
        </Label>
        <TextInput
          id="name"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label className="mb-2 mt-4 block" htmlFor="description">
          Description
        </Label>
        <TextInput
          id="description"
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" className="mt-4">
          {editMode ? "Update Item" : "Add Item"}
        </Button>
        {editMode && (
          <Button onClick={resetForm} className="ml-2 mt-4" color="gray">
            Cancel
          </Button>
        )}
      </form>
      <Table className="mt-6">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleEdit(item)} color="blue">
                  Edit
                </Button>
                <Button
                  onClick={() => deleteItem(item.id)}
                  color="red"
                  className="ml-2"
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
