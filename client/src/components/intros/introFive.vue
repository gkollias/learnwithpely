<template>
  <!-- intro-section -->

  <section
    id="intro-wrap"
    class="intro-five-Wrap bg-primary text-left text-white"
  >
    <b-container>
      <b-row>
        <div class="col-md-6 intro-five-LeftSection pb-5">
          <h1 class=" font-weight-bold text-white text-42 mb-3 t-shadow">
            Διάβασε, παίξε, κέρδισε!
          </h1>
          <p class=" text-20 mb-4">
            Σ´αυτό το site μπορεἰς να κάνεις εξάσκηση στην γραμματική, το συντακτικό, την ορθογραφία
            αλλά και στα μαθηματικά μέσα απο διαδραστικές ερωτήσεις.
          </p>
          <div class=" mb-5 lead">
            <ul class="list-inline">
              <li class=" mb-3 ">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Ο στόχος είναι να μαζέψεις όσους πιο πολλούς πόντους μπορείς για να γίνεις genius!
              </li>

              <li class="mb-3">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Όσες πιο πολλές σωστές ερωτήσεις απαντήσεις τόσους πιο πολλούς πόντους
                θα συγκεντρώσεις!
              </li>
            </ul>
          </div>
          <p class=" text-20 mb-4">
            Καλη επιτυχία!!✌️
          </p>
        </div>
        <b-col
          md="6"
          class="  intro-five-RightSection d-flex align-items-center"
        >
          <div class="intro-five-ProductImage">
            <img
              src="@/assets/images/school-boy.png"
              class="img-responsive school-boy"
              alt=""
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="overlay" />
  </section>
  <!-- end::intro-section -->
</template>

<style>
.school-boy {
  max-width: 200px;
  transform: scaleX(-1);
}
</style>
