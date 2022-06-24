<script>
  import { onMount } from "svelte";

  let sub;
  onMount(async () => {
    const isLoggedIn = !!localStorage.getItem("username");

    if ("serviceWorker" in navigator) {
      // Service worker supported
      navigator.serviceWorker.register("/service-worker.js");
      const reg = await navigator.serviceWorker.ready;
      reg.pushManager.subscribe({ userVisibleOnly: true });

      sub = await reg.pushManager.getSubscription();
      if (!sub) {
        // Fetch VAPID public key
        const res = await fetch("/api/vapidkeys");
        const data = await res.text();
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: data,
        });
      }
      console.log(sub);
    }

    const status = await Notification.requestPermission();
    if (status !== "granted") alert("Permita as notificações");
  });
</script>

<div class="navv shadow">
  <p class="text-primary text-center w-100 mt-3">Diário da Região</p>
</div>

<div class="container mb-5" style="margin-top: 100px;">
  <h3>
    Polícia Militar abre concurso para 2,7 mil vagas em todo o estado de São
    Paulo
  </h3>
  <p>
    Inscrições podem ser feitas a partir desta sexta, 24; Rio Preto está entre
    os municípios onde a PM realizará os exames de conhecimentos
  </p>
  <p><b>Luna Kfouri</b></p>

  <img
    src="https://www.diariodaregiao.com.br/image/policy:1.980668.1656079219:1656079219/image.jpg?f=2x1&w=1200"
    alt="img"
    class="img-fluid shadow"
  />

  <p class="mt-3">
    A Polícia Militar do estado de São Paulo abriu concurso público para
    contratar 2,7 mil soldados em todo o estado. As inscrições começam nesta
    sexta-feira, 24, e seguem até às 23h59 do dia 20 de julho. Os interessados
    podem se inscrever pelo site da Fundação Getúlio Vargas. O valor da taxa de
    inscrição é de R$ 57,00, que deve ser paga até o 1º dia útil subsequente ao
    término do período das inscrições. A remuneração básica inicial para o cargo
    de Soldado PM 2º de classe é de R$ 3.875,27.
  </p>
  <p>
    Conforme o edital, lançado nesta semana, Rio Preto está entre os municípios
    onde a PM realizará os exames de conhecimentos com data prevista para o dia
    4 de setembro deste ano, no período da tarde. Além de Rio Preto, essa etapa
    também será realizada nas cidades Araçatuba; Bauru; Campinas; Piracicaba;
    Presidente Prudente; Ribeirão Preto; Santos; São José dos Campos; São Paulo
    e Sorocaba.
  </p>
</div>

<style>
  .navv {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-items: center;
    background-color: #ffffff;
  }

  .navv p {
    font-size: 20px !important;
    font-weight: bold;
  }
</style>
