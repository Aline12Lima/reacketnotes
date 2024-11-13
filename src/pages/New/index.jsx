import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { Container, Form } from "./styles";
import { useAuth } from "../../hooks/auth";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState("");
  const navigate = useNavigate();
  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTags]);
    setNewTags("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }
  async function handleNewNote() {
    try {
      if (!title) {
        return alert("por favor adicione o titulo da nota antes de salvar");
      }
      if (newTags) {
        return alert(
          "Por favor adicione a tag informada para prosseguir ou deixe vazio"
        );
      }
      if (newLink) {
        return alert(
          "Por favor adicione o link informado para prosseguir ou deixe vazio"
        );
      }

      await api.post(`/notes`, {
        title,
        description,
        tags,
        links,
      });
      alert("Nota Criada com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Titúlo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo links"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  placeholder=" 1 tag"
                  key={String(index)}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                />
              ))}

              <NoteItem
                isNew
                placeholder=" Nova tag"
                onChange={(e) => setNewTags(e.target.value)}
                value={newTags}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
