import fs from "fs";
import { makeId } from "../service/util.service.js";

export {
  getPosts,
  getPost,
  deleteItem,
  addPost,
  updateItem,
  checkForRoot,
};

const getPosts = (req, res, next) => {
  const { id } = req.params;
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) throw new Error(err);
    const menuItems = JSON.parse(data);
    const parentItem = menuItems[id];
    if (parentItem?.children && Object.keys(parentItem?.children).length > 0) {
      let childrens = {};
      for (const item in parentItem.children) {
        childrens[item] = menuItems[item];
      }
      res.send({ parentId: id, childrens });
    }
  });
};

const getPost = (req, res, next) => {
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) throw new Error(err);
    const menuItems = JSON.parse(data);
    let rootItem = null;
    for (const item in menuItems) {
      if (menuItems[item].isRoot) {
        rootItem = menuItems[item];
      }
    }
    if (rootItem?.children && Object.keys(rootItem?.children).length > 0) {
      let childrens = {};
      if (rootItem) {
        for (const item in rootItem.children) {
          childrens[item] = menuItems[item];
        }
        res.send({ parentId: null, childrens });
      }
    }
  });
};

const deleteItem = (req, res, next) => {
  const { id, parentId } = req.query;
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file." });
    }

    const menuItems = JSON.parse(data);

    if (menuItems[id]) {
      delete menuItems[id];
    }

    if (parentId && menuItems[parentId] && menuItems[parentId].children[id]) {
      delete menuItems[parentId].children[id];
    }

    fs.writeFile("data/menu-items.json", JSON.stringify(menuItems), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file." });
      }
      res.status(200).send({ message: "Item deleted" });
    });
  });
};

const addPost = (req, res, next) => {
  const { parentId, title, url } = req.body;
  console.log("req.body", req.body);
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file." });
    }

    const menuItems = JSON.parse(data);

    const newItemId = makeId(); // You can implement a function to generate unique IDs
    let newItem = null;

    if (parentId) {
      if (!menuItems[parentId].children) {
        menuItems[parentId].children = {};
      }
      menuItems[parentId].children[newItemId] = true;
      newItem = {
        title: title,
        url: url,
      };
      menuItems[newItemId] = newItem;
    }

    fs.writeFile("data/menu-items.json", JSON.stringify(menuItems), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file." });
      }
      res.status(201).json({ message: "Item added", menuItems });
    });
  });
};

const updateItem = (req, res, next) => {
  const { id, ...item } = req.body;
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file." });
    }

    const menuItems = JSON.parse(data);
    let updateItem = null;
    if (menuItems[id]) {
      menuItems[id] = {
        ...menuItems[id],
        ...item,
      };
    }

    fs.writeFile("data/menu-items.json", JSON.stringify(menuItems), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file." });
      }
      res.status(200).json({ message: "Item updated", item: updateItem });
    });
  });
};

const checkForRoot = (req, res, next) => {
  fs.readFile("data/menu-items.json", "utf8", (err, data) => {
    if (err) throw new Error(err);
    const menuItems = JSON.parse(data);
    if (Object.keys(menuItems).length > 0) {
      res.status(200).json({ message: "items exist" });
    } else {
      res.status(404).json({ message: "no items exist" });
    }
  });
};
